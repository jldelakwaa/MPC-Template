import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronDown, Mail, Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
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
import { Head, router } from '@inertiajs/react';

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
}

interface PaginatorLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedMessages {
    data: ContactMessage[];
    links: PaginatorLink[];
    next_page_url: string | null;
    prev_page_url: string | null;
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
}

interface MessageFilters {
    search?: string;
}

interface Props {
    messages: PaginatedMessages;
    filters: MessageFilters;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contact Messages',
        href: '/ContactMessages',
    },
];

const createColumns = (): ColumnDef<ContactMessage>[] => [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'subject',
        header: 'Subject',
        cell: ({ row }) => <div className="max-w-xs truncate">{row.original.subject}</div>,
    },
    {
        accessorKey: 'message',
        header: 'Message',
        cell: ({ row }) => (
            <div className="max-w-md truncate text-muted-foreground" title={row.original.message}>
                {row.original.message}
            </div>
        ),
    },
    {
        accessorKey: 'created_at',
        header: 'Date',
        cell: ({ row }) => new Date(row.original.created_at).toLocaleString('en-US'),
    },
];

export default function ContactMessagesIndex({ messages, filters = {} }: Props) {
    const columns = useMemo(() => createColumns(), []);

    const table = useReactTable({
        data: messages.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: messages.last_page,
    });

    const [searchValue, setSearchValue] = useState(filters.search || '');

    const handleSearch = useCallback((value: string) => {
        router.get(
            '/ContactMessages',
            { search: value || undefined },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['messages', 'filters'],
            }
        );
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchValue !== filters.search) {
                handleSearch(searchValue);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchValue, filters.search, handleSearch]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Messages" />

            <div className="m-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                            <Mail className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Contact Messages</h1>
                            <p className="text-sm text-muted-foreground">Comments & suggestions sent from the website</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search messages..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="pl-8"
                        />
                    </div>

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
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        {filters.search ? `No messages found matching "${filters.search}"` : 'No contact messages yet.'}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {messages.last_page > 1 && (
                    <Pagination>
                        <PaginationContent>
                            {messages.links.map((link, i) => {
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

                {messages.data.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                        Showing {(messages.current_page - 1) * messages.per_page + 1} to {Math.min(messages.current_page * messages.per_page, messages.total)} of {messages.total} messages
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
