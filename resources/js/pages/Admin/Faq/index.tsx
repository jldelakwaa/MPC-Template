'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, FolderKanban, MoreHorizontal, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useMemo } from 'react';

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

// ============================================================================
// Types & Interfaces
// ============================================================================

interface FaqCategory {
    id: number;
    title: string;
}

interface Faq {
    id: number;
    category_id: number;
    question: string;
    answer: string;
    category?: FaqCategory | null;
    created_at: string;
    updated_at: string;
}

interface PaginatorLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedFaqs {
    data: Faq[];
    links: PaginatorLink[];
    next_page_url: string | null;
    prev_page_url: string | null;
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
}

interface FaqFilters {
    search?: string;
}

interface FaqIndexProps {
    faqs: PaginatedFaqs;
    filters: FaqFilters;
}

// ============================================================================
// Constants
// ============================================================================

const BREADCRUMBS: BreadcrumbItem[] = [
    {
        title: 'FAQ',
        href: '/Faq',
    },
];


// ============================================================================
// Helper Functions
// ============================================================================

const handleDeleteFaq = (id: number): void => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
        router.delete(`/Faq/${id}`, {
            preserveScroll: true,
            onError: (errors) => {
                console.error('Failed to delete FAQ:', errors);
            },
        });
    }
};

const handleBulkDelete = (selectedIds: number[], resetSelection: () => void): void => {
    if (selectedIds.length === 0) return;

    const message = `Are you sure you want to delete ${selectedIds.length} FAQ${selectedIds.length > 1 ? 's' : ''}?`;
    if (confirm(message)) {
        router.delete('/Faq/bulk-delete', {
            data: { ids: selectedIds },
            preserveScroll: true,
            onSuccess: () => {
                resetSelection();
            },
            onError: (errors) => {
                console.error('Failed to bulk delete FAQs:', errors);
            },
        });
    }
};

// ============================================================================
// Components
// ============================================================================

const CategoryBadge = ({ category }: { category?: FaqCategory | null }) => (
    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
        {category?.title || 'Uncategorized'}
    </span>
);

const FaqActionsMenu = ({ faq }: { faq: Faq }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
                <Link href={`/Faq/${faq.id}/edit`}>
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDeleteFaq(faq.id)} className="text-red-600 focus:text-red-600">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

// ============================================================================
// Column Definitions
// ============================================================================

const createColumns = (): ColumnDef<Faq>[] => [
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
        enableHiding: false,
    },
    {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => <CategoryBadge category={row.original.category} />,
    },
    {
        accessorKey: 'question',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="-ml-4">
                Question
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium">{row.original.question}</div>,
    },
    {
        accessorKey: 'answer',
        header: 'Answer',
        cell: ({ row }) => (
            <div className="max-w-md truncate" title={row.original.answer}>
                {row.original.answer}
            </div>
        ),
    },
    {
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => (
            <div className="text-right">
                <FaqActionsMenu faq={row.original} />
            </div>
        ),
        enableHiding: false,
    },
];

// ============================================================================
// Main Component
// ============================================================================

export default function FaqIndex({ faqs, filters ={} }: FaqIndexProps) {
    const columns = useMemo(() => createColumns(), []);

    const table = useReactTable({
        data: faqs.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: faqs.last_page,
    });

    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const hasSelection = selectedRows.length > 0;

    const handleSearch = (searchValue: string) => {
        router.get(
            '/Faq',
            { search: searchValue || undefined },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['faqs', 'filters'],
            }
        );
    };

    return (
        <AppLayout breadcrumbs={BREADCRUMBS}>
            <Head title="FAQ Management" />

            <div className="m-4 space-y-4">
                {/* Header Actions */}
                <div className="flex justify-end gap-2">
                    <Link href="/FaqCategories">
                        <Button variant="outline">
                            <FolderKanban className="mr-2 h-4 w-4" />
                            Manage Categories
                        </Button>
                    </Link>
                    <Link href="/Faq/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create FAQ
                        </Button>
                    </Link>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-2">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search FAQs..."
                            defaultValue={filters.search}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-8"
                        />
                    </div>

                    {hasSelection && (
                        <Button
                            variant="destructive"
                            onClick={() =>
                                handleBulkDelete(
                                    selectedRows.map((row) => row.original.id),
                                    () => table.toggleAllPageRowsSelected(false)
                                )
                            }
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Selected ({selectedRows.length})
                        </Button>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns
                                <ChevronDown className="ml-2 h-4 w-4" />
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

                {/* Table */}
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        <div className="text-muted-foreground">
                                            {filters.search ? `No FAQs found matching "${filters.search}"` : 'No FAQs found. Create your first FAQ to get started.'}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {faqs.last_page > 1 && (
                    <Pagination>
                        <PaginationContent>
                            {faqs.links.map((link, i) => {
                                if (link.url === null) {
                                    return (
                                        <PaginationItem key={i}>
                                            {link.label.includes('Previous') ? (
                                                <PaginationPrevious className="cursor-not-allowed opacity-50" aria-disabled="true" />
                                            ) : link.label.includes('Next') ? (
                                                <PaginationNext className="cursor-not-allowed opacity-50" aria-disabled="true" />
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

                {/* Results Info */}
                {faqs.data.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                        Showing {(faqs.current_page - 1) * faqs.per_page + 1} to {Math.min(faqs.current_page * faqs.per_page, faqs.total)} of {faqs.total} FAQs
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
