import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, Download, FolderKanban, MoreHorizontal, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

interface Downloadable {
    id: number;
    title: string;
    downloadable_form: string | null;
    downloadable_category_id: number;
    category?: {
        id: number;
        category_name: string;
    } | null;
    created_at: string;
    updated_at: string;
}

interface PaginatorLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedDownloadables {
    data: Downloadable[];
    links: PaginatorLink[];
    next_page_url: string | null;
    prev_page_url: string | null;
    current_page: number;
    last_page: number;
}

interface Props {
    downloadables: PaginatedDownloadables;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Downloadables',
        href: '/Downloadables',
    },
];

// 🧱 Column Definitions
const columns: ColumnDef<Downloadable>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
    },
    {
        accessorKey: 'title',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Title
                <ArrowUpDown />
            </Button>
        ),
    },
    {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) =>
            row.original.category ? (
                <Badge variant="secondary">{row.original.category.category_name}</Badge>
            ) : (
                <span className="text-muted-foreground italic">No category</span>
            ),
    },
    {
        accessorKey: 'downloadable_form',
        header: 'File',
        cell: ({ row }) => (
            row.original.downloadable_form ? (
                <a
                    href={`/storage/${row.original.downloadable_form}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                >
                    <Download className="h-4 w-4" />
                    Download
                </a>
            ) : (
                <span className="text-muted-foreground italic">No file</span>
            )
        ),
    },
    {
        accessorKey: 'created_at',
        header: 'Date Created',
        cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString('en-US'),
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const downloadable = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href={`/Downloadables/${downloadable.id}/edit`}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                window.Swal.fire({
                                    title: 'Are you sure?',
                                    text: 'You won\'t be able to revert this!',
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#d33',
                                    cancelButtonColor: '#3085d6',
                                    confirmButtonText: 'Yes, delete it!'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        router.delete(`/Downloadables/${downloadable.id}`, {
                                            preserveScroll: true,
                                        });
                                    }
                                });
                            }}
                        >
                            <Trash2 className="mr-2 h-4 w-4 text-destructive" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

// 🧮 Main Page Component
export default function DownloadablesIndex({ downloadables, filters }: Props) {
    const { flash } = usePage<SharedData>().props;

    const [searchValue, setSearchValue] = useState(filters.search || '');

    const handleSearch = useCallback((value: string) => {
        router.get('/Downloadables', { search: value || undefined }, { preserveState: true, preserveScroll: true, only: ['downloadables', 'filters'] });
    }, []);

    useEffect(() => {
        if (flash?.success) {
            window.Swal.fire('Success', flash.success, 'success');
        }
    }, [flash?.success]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchValue !== filters.search) handleSearch(searchValue);
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [searchValue, filters.search, handleSearch]);

    const table = useReactTable({
        data: downloadables.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const hasSelection = table.getFilteredSelectedRowModel().rows.length > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Downloadables" />
            <div className="m-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-purple-50 p-2 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
                            <Download className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Downloadables</h1>
                            <p className="text-sm text-muted-foreground">Manage downloadable files</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/DownloadableCategories">
                            <Button variant="outline">
                                <FolderKanban className="mr-2 h-4 w-4" /> Manage Categories
                            </Button>
                        </Link>
                        <Link href="/Downloadables/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Create Downloadable
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative max-w-sm flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search downloadables..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    {hasSelection && (
                        <Button
                            variant="destructive"
                            onClick={() => {
                                window.Swal.fire({
                                    title: 'Are you sure?',
                                    text: 'You won\'t be able to revert this!',
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#d33',
                                    cancelButtonColor: '#3085d6',
                                    confirmButtonText: 'Yes, delete selected!'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        const selectedIds = table.getFilteredSelectedRowModel().rows.map((row) => (row.original as Downloadable).id);
                                        router.delete('/Downloadables/bulk-delete', {
                                            data: { ids: selectedIds },
                                            preserveScroll: true,
                                            onSuccess: () => {
                                                table.toggleAllPageRowsSelected(false);
                                            },
                                        });
                                    }
                                });
                            }}
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Selected ({table.getFilteredSelectedRowModel().rows.length})
                        </Button>
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((col) => col.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {downloadables.data.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No downloadables found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {downloadables.last_page > 1 && (
                <Pagination className="mt-4">
                    <PaginationContent>
                        {downloadables.links.map((link, i) => {
                            if (link.url === null) {
                                return (
                                    <PaginationItem key={i}>
                                        {link.label.includes('Previous') ? (
                                            <PaginationPrevious className="cursor-not-allowed opacity-50" />
                                        ) : link.label.includes('Next') ? (
                                            <PaginationNext className="cursor-not-allowed opacity-50" />
                                        ) : (
                                            <PaginationEllipsis />
                                        )}
                                    </PaginationItem>
                                );
                            }

                            if (link.label.includes('Previous')) {
                                return (
                                    <PaginationItem key={i}>
                                        <PaginationPrevious href={link.url} />
                                    </PaginationItem>
                                );
                            }

                            if (link.label.includes('Next')) {
                                return (
                                    <PaginationItem key={i}>
                                        <PaginationNext href={link.url} />
                                    </PaginationItem>
                                );
                            }

                            return (
                                <PaginationItem key={i}>
                                    {!isNaN(Number(link.label)) && (
                                        <PaginationLink href={link.url} isActive={link.active}>
                                            {link.label}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            );
                        })}
                    </PaginationContent>
                </Pagination>
                )}
            </div>
        </AppLayout>
    );
}
