import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowBigLeftDash, Pencil, Plus, Trash2 } from 'lucide-react';

interface OfficerCategory {
    id: number;
    name: string;
    description: string | null;
    officers_count: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    categories: OfficerCategory[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Officer Categories',
        href: '/OfficerCategories',
    },
];

export default function Index({ categories }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category? This will remove the category from all officers.')) {
            router.delete(`/OfficerCategories/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Officer Categories" />
            <div className="m-4">
                <div className="mb-4 flex justify-end">
                    <Link href="/OfficerCategories/create">
                        <Button>
                            <Plus />
                            Create Category
                        </Button>
                    </Link>
                    <Link href="/Officers">
                        <Button variant="outline">
                            <ArrowBigLeftDash />
                            Back to Officers
                        </Button>
                    </Link>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Officers Count</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        No categories found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                categories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell className="font-medium">{category.name}</TableCell>
                                        <TableCell>
                                            {category.description || <span className="text-muted-foreground italic">No description</span>}
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-800">
                                                {category.officers_count}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/OfficerCategories/${category.id}/edit`}>
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
