import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, ExternalLink, MoreHorizontal, Pencil, Plus, Search, Trash2 } from 'lucide-react';

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
        accessorKey: 'button_text',
        header: 'Button',
        cell: ({ row }) =>
            row.original.button_text ? (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {row.original.button_text}
                </span>
            ) : (
                <span className="text-muted-foreground italic">No button</span>
            ),
    },
    {
        accessorKey: 'button_link',
        header: 'Link',
        cell: ({ row }) =>
            row.original.button_link ? (
                <a href={row.original.button_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:underline">
                    <ExternalLink className="h-4 w-4" />
                </a>
            ) : (
                <span className="text-muted-foreground">-</span>
            ),
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
                            <Trash2 className="mr-2 h-4 w-4 text-red-500" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function HomePageIndex({ homePageImages, filters }: Props) {
    const table = useReactTable({
        data: homePageImages.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="HomePage Images" />
            <div className="m-4">
                <div className="mb-4 flex justify-end gap-2">
                    <Link href="/HomePage/create">
                        <Button>
                            <Plus /> Create Homepage Image
                        </Button>
                    </Link>
                </div>

                <div className="flex items-center py-4">
                    <div className="relative w-full max-w-sm">
                        <Input
                            placeholder="Search homepage images..."
                            defaultValue={filters.search}
                            onChange={(e) => {
                                router.get('/HomePage', { search: e.target.value }, { preserveState: true, preserveScroll: true });
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
            </div>
        </AppLayout>
    );
}
