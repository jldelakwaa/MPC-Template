import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, ExternalLink, Home, MoreHorizontal, Pencil, Plus, Search, Trash2 } from 'lucide-react';
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
import { Head, Link, router } from '@inertiajs/react';

interface HomePageImage {
    id: number;
    title: string;
    image: string | null;
    content: string;
    button_link: string | null;
    button_text: string | null;
    created_at: string;
    updated_at: string;
}

interface PaginatorLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedHomePageImages {
    data: HomePageImage[];
    links: PaginatorLink[];
    next_page_url: string | null;
    prev_page_url: string | null;
    current_page: number;
    last_page: number;
}

interface Props {
    homePageImages: PaginatedHomePageImages;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'HomePage Images',
        href: '/HomePage',
    },
];

const columns: ColumnDef<HomePageImage>[] = [
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
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) =>
            row.original.image ? (
                <img src={`/storage/${row.original.image}`} alt={row.original.title} className="h-16 w-24 rounded object-cover" />
            ) : (
                <div className="flex h-16 w-24 items-center justify-center rounded bg-gray-200">
                    <span className="text-xs text-gray-500">No Image</span>
                </div>
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
        accessorKey: 'content',
        header: 'Content',
        cell: ({ row }) => <div className="max-w-md truncate">{row.original.content}</div>,
    },
    {
        id: 'button',
        header: 'Button',
        cell: ({ row }) => {
            const { button_text, button_link } = row.original;
            if (!button_text) return <span className="text-muted-foreground">—</span>;
            if (button_link)
                return (
                    <a href={button_link} target="_blank" rel="noopener noreferrer">
                        <Badge variant="secondary" className="gap-1 cursor-pointer">
                            {button_text} <ExternalLink className="h-3 w-3" />
                        </Badge>
                    </a>
                );
            return <Badge variant="secondary">{button_text}</Badge>;
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const item = row.original;
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
                            <Link href={`/HomePage/${item.id}/edit`}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this homepage image?')) {
                                    router.delete(`/HomePage/${item.id}`, {
                                        preserveScroll: true,
                                    });
                                }
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

export default function HomePageIndex({ homePageImages, filters }: Props) {
    const [searchValue, setSearchValue] = useState(filters.search || '');

    const handleSearch = useCallback((value: string) => {
        router.get('/HomePage', { search: value || undefined }, { preserveState: true, preserveScroll: true, only: ['homePageImages', 'filters'] });
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchValue !== filters.search) handleSearch(searchValue);
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [searchValue, filters.search, handleSearch]);

    const table = useReactTable({
        data: homePageImages.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const hasSelection = table.getFilteredSelectedRowModel().rows.length > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="HomePage Images" />
            <div className="m-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-cyan-50 p-2 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400">
                            <Home className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Homepage Images</h1>
                            <p className="text-sm text-muted-foreground">Manage homepage banner images</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/HomePage/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Create Homepage Image
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative max-w-sm flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search homepage images..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    {hasSelection && (
                        <Button
                            variant="destructive"
                            className="ml-2"
                            onClick={() => {
                                if (confirm('Are you sure you want to delete selected images?')) {
                                    const selectedIds = table.getFilteredSelectedRowModel().rows.map((row) => row.original.id);
                                    router.delete('/HomePage/bulk-delete', {
                                        data: { ids: selectedIds },
                                        preserveScroll: true,
                                        onSuccess: () => {
                                            table.toggleAllPageRowsSelected(false);
                                        },
                                    });
                                }
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
                            {homePageImages.data.length ? (
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
                                        No homepage images found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {homePageImages.last_page > 1 && (
                <Pagination className="mt-4">
                    <PaginationContent>
                        {homePageImages.links.map((link, i) => {
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
