'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown,Download, FolderKanban, MoreHorizontal, Pencil, Plus, Search, Trash2 } from 'lucide-react';

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
import { Head, Link, router } from '@inertiajs/react';

interface Downloadable {
    id: number;
    title: string;
    description: string | null;
    file_path: string;
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
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {row.original.category.category_name}
                </span>
            ) : (
                <span className="text-muted-foreground italic">No category</span>
            ),
    },
    {
        accessorKey: 'file_path',
        header: 'File',
        cell: ({ row }) => (
            <a href={`/storage/${row.original.file_path}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                <Download className="h-4 w-4" />
                Download
            </a>
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
                                if (confirm('Are you sure you want to delete this item?')) {
                                    router.delete(`/Downloadables/${downloadable.id}`, {
                                        preserveScroll: true,
                                    });
                                }
                            }}
                        >
                            <Trash2 className="mr-2 h-4 w-4 text-red-500" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

// 🧮 Main Page Component
export default function DownloadablesIndex({ downloadables, filters }: Props) {
    const table = useReactTable({
        data: downloadables.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Downloadables" />
            <div className="m-4">
                <div className="mb-4 flex justify-end gap-2">
                    <Link href="/DownloadableCategories">
                        <Button variant="outline">
                            <FolderKanban /> Manage Categories
                        </Button>
                    </Link>
                    <Link href="/Downloadables/create">
                        <Button>
                            <Plus /> Create Downloadable
                        </Button>
                    </Link>
                </div>

                <div className="flex items-center py-4">
                    <div className="relative w-full max-w-sm">
                        <Input
                            placeholder="Search downloadables..."
                            defaultValue={filters.search}
                            onChange={(e) => {
                                router.get('/Downloadables', { search: e.target.value }, { preserveState: true, preserveScroll: true });
                            }}
                            className="max-w-sm"
                        />
                        <Search className="absolute top-2.5 right-2 h-4 w-4 text-muted-foreground" />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown />
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

                {/* Laravel Pagination */}
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
            </div>
        </AppLayout>
    );
}
