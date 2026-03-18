import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface FaqCategory {
    id: number;
    title: string;
    description: string;
}

interface Props {
    category: FaqCategory;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'FaqCategories',
        href: '/FaqCategories',
    },
];

export default function EditFaqCategory({ category }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: category.title,
        description: category.description,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/FaqCategories/${category.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Faq Category" />
            <div className="m-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="rounded-xl border-0 bg-card shadow-md overflow-hidden">
                        <div className="h-1.5 bg-primary" />
                        <div className="p-6">
                        <h2 className="mb-6 text-2xl font-bold">Edit Faq Category</h2>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter category title"
                                    name="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.title && <p className="mt-1 text-sm text-destructive">{errors.title}</p>}
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Enter category description (optional)"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 min-h-[120px]"
                                />
                                {errors.description && <p className="mt-1 text-sm text-destructive">{errors.description}</p>}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Category'}
                                </Button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
