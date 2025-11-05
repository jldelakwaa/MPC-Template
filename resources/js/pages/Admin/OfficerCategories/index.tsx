'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowBigLeftDash, ArrowUpDown, ChevronDown, MoreHorizontal, Pencil, Plus, Search, Trash2 } from 'lucide-react';

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

interface OfficerCategory {
    id: number;
    name: string;
    description: string | null;
    officers_count: number;
    created_at: string;
    updated_at: string;
}

interface PaginatorLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedOfficerCategory {
    data: OfficerCategory[];
    links: PaginatorLink[];
    next_page_url: string | null;
    prev_page_url: string | null;
    current_page: number;
    last_page: number;
}

interface Props {
    categories: PaginatedOfficerCategory;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Officer Categories',
        href: '/OfficerCategories',
    },
];

// 🧱 Column Definitions
const columns: ColumnDef<OfficerCategory>[] = [
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
        accessorKey: 'name',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Name
                <ArrowUpDown />
            </Button>
        ),
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => (
            <div className="max-w-md truncate">
                {row.original.description || <span className="text-muted-foreground italic">No description</span>}
            </div>
        ),
    },
    {
        accessorKey: 'officers_count',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Officers Count
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {row.original.officers_count}
            </span>
        ),
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const category = row.original;
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
                            <Link href={`/OfficerCategories/${category.id}/edit`}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this category? This will remove the category from all officers.')) {
                                    router.delete(`/OfficerCategories/${category.id}`, {
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
export default function OfficerCategoryIndex({ categories, filters }: Props) {
    const table = useReactTable({
        data: categories.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Officer Categories" />
            <div className="m-4">
                <div className="mb-4 flex justify-end gap-2">
                    <Link href="/Officers">
                        <Button variant="outline">
                            <ArrowBigLeftDash /> Back to Officers
                        </Button>
                    </Link>
                    <Link href="/OfficerCategories/create">
                        <Button>
                            <Plus /> Create Category
                        </Button>
                    </Link>
                </div>

                <div className="flex items-center py-4">
                    <div className="relative w-full max-w-sm">
                        <Input
                            placeholder="Search categories..."
                            defaultValue={filters.search}
                            onChange={(e) => {
                                router.get('/OfficerCategories', { search: e.target.value }, { preserveState: true, preserveScroll: true });
                            }}
                            className="max-w-sm"
                        />
                        <Search className="absolute top-2.5 right-2 h-4 w-4 text-muted-foreground" />
                    </div>
                    {table.getFilteredSelectedRowModel().rows.length > 0 && (
                        <Button
                            variant="destructive"
                            className="ml-2"
                            onClick={() => {
                                if (confirm('Are you sure you want to delete selected categories? This will remove categories from all officers.')) {
                                    const selectedIds = table.getFilteredSelectedRowModel().rows.map((row) => (row.original as OfficerCategory).id);
                                    router.delete('/OfficerCategories/bulk-delete', {
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
                            {categories.data.length ? (
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
                                        No categories found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Laravel Pagination */}
                <Pagination className="mt-4">
                    <PaginationContent>
                        {categories.links.map((link, i) => {
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
