import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { FolderKanban, Pencil, Plus, Trash2 } from 'lucide-react';

interface FaqCategories {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    categories: FaqCategories[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'FaqCategories',
        href: '/FaqCategories',
    },
];

export default function Index({ categories = [] }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category? This will remove the category from all FAQs.')) {
            router.delete(`/FaqCategories/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FaqCategories" />
            <div className="m-4">
                <div className="mb-4 flex justify-end gap-2">
                    <Link href="/Faq">
                        <Button variant="outline" className="mr-2">
                            <FolderKanban className="mr-2" /> Manage FaQ
                        </Button>
                    </Link>
                    <Link href="/FaqCategories/create">
                        <Button>
                            <Plus />
                            Create Category
                        </Button>
                    </Link>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">
                                        No FAQ categories found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                categories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell className="font-medium">{category.title}</TableCell>
                                        <TableCell>{category.description}</TableCell>

                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/FaqCategories/${category.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" size="sm" onClick={() => handleDelete(category.id)}>
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
            </div>
        </AppLayout>
    );
}
