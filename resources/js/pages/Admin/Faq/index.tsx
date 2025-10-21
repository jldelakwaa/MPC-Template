import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { FolderKanban, Pencil, Plus, Trash2 } from 'lucide-react';

interface Faq {
    id: number;
    category_id: number;
    question: string;
    answer: string;
    category?: {
        id: number;
        title: string;
    } | null;
    created_at: string;
    updated_at: string;
}

interface PaginatedFaqs {
    data: Faq[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    // You can add other paginator properties here if needed
}

interface Props {
    faqs: PaginatedFaqs;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Faq',
        href: '/Faq',
    },
];

export default function Index({ faqs }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this faq?')) {
            router.delete(`/Faq/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Faq" />
            <div className="m-4">
                <div className="mb-4 flex justify-end gap-2">
                    <Link href="/FaqCategories">
                        <Button variant="outline">
                            <FolderKanban /> Manage Categories
                        </Button>
                    </Link>
                    <Link href="/Faq/create">
                        <Button>
                            <Plus />
                            Create FaQ
                        </Button>
                    </Link>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Category</TableHead>
                                <TableHead>Question</TableHead>
                                <TableHead>Answer</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {faqs.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">
                                        No Faq found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                faqs.data.map((faq) => (
                                    <TableRow key={faq.id}>
                                        <TableCell>
                                            {faq.category ? (
                                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                    {faq.category.title}
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground italic">No category</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{faq.question}</TableCell>
                                        <TableCell>{faq.answer}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/Faq/${faq.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" size="sm" onClick={() => handleDelete(faq.id)}>
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
