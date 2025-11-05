'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, FolderKanban, MoreHorizontal, Pencil, Plus, Search, Trash2 } from 'lucide-react';

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface FaqCategory {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    categories: FaqCategory[];
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'FAQ Categories',
        href: '/FaqCategories',
    },
];

// 🧱 Column Definitions
const columns: ColumnDef<FaqCategory>[] = [
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
        cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => <div className="max-w-md">{row.original.description}</div>,
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
                            <Link href={`/FaqCategories/${category.id}/edit`}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this category? This will remove the category from all FAQs.')) {
                                    router.delete(`/FaqCategories/${category.id}`, {
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
export default function Index({ categories = [], filters = {} }: Props) {
    const table = useReactTable({
        data: categories,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQ Categories" />
            <div className="m-4">
                <div className="mb-4 flex justify-end gap-2">
                    <Link href="/Faq">
                        <Button variant="outline">
                            <FolderKanban /> Manage FAQs
                        </Button>
                    </Link>
                    <Link href="/FaqCategories/create">
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
                                router.get('/FaqCategories', { search: e.target.value }, { preserveState: true, preserveScroll: true });
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
                                if (confirm('Are you sure you want to delete selected categories? This will remove the category from all FAQs.')) {
                                    const selectedIds = table.getFilteredSelectedRowModel().rows.map((row) => (row.original as FaqCategory).id);
                                    router.delete('/FaqCategories/bulk-delete', {
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
                            {categories.length ? (
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
                                        No FAQ categories found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
