import { Button } from '@/components/ui/button';
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
import { FolderKanban, Pencil, Plus, Trash2 } from 'lucide-react';

interface Officer {
    id: number;
    officer_category_id: number | null;
    name: string;
    position: string;
    birthday: string;
    image: string | null;
    category?: {
        id: number;
        name: string;
    } | null;
    created_at: string;
    updated_at: string;
}

interface PaginatorLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedOfficers {
    data: Officer[];
    links: PaginatorLink[];
    next_page_url: string | null;
    prev_page_url: string | null;
    current_page: number;
    last_page: number;
}

interface Props {
    officers: PaginatedOfficers;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Officers',
        href: '/Officers',
    },
];

export default function Index({ officers }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this officer?')) {
            router.delete(`/Officers/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Officers" />
            <div className="m-4">
                <div className="mb-4 flex justify-end gap-2">
                    <Link href="/OfficerCategories">
                        <Button variant="outline">
                            <FolderKanban /> Manage Categories
                        </Button>
                    </Link>
                    <Link href="/Officers/create">
                        <Button>
                            <Plus />
                            Create Officer
                        </Button>
                    </Link>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Birthday</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {officers.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">
                                        No officers found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                officers.data.map((officer) => (
                                    <TableRow key={officer.id}>
                                        <TableCell>
                                            {officer.image ? (
                                                <img
                                                    src={`/storage/${officer.image}`}
                                                    alt={officer.name}
                                                    className="h-12 w-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                                                    <span className="text-xs text-gray-500">No Image</span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{officer.name}</TableCell>
                                        <TableCell>{officer.position}</TableCell>
                                        <TableCell>
                                            {officer.category ? (
                                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                    {officer.category.name}
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground italic">No category</span>
                                            )}
                                        </TableCell>
                                        <TableCell>{new Date(officer.birthday).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/Officers/${officer.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" size="sm" onClick={() => handleDelete(officer.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                <Pagination className="mt-4">
                    <PaginationContent>
                        {officers.links.map((link, index) => {
                            if (link.url === null) {
                                // Handle disabled links (like '...' or prev/next on first/last page)
                                return (
                                    <PaginationItem key={index}>
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
                                    <PaginationItem key={index}>
                                        <PaginationPrevious href={link.url} />
                                    </PaginationItem>
                                );
                            }

                            if (link.label.includes('Next')) {
                                return (
                                    <PaginationItem key={index}>
                                        <PaginationNext href={link.url} />
                                    </PaginationItem>
                                );
                            }

                            return (
                                <PaginationItem key={index}>
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
