import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface DownloadableCategory {
    id: number; // Changed to number to match Laravel
    category_name: string;
    description: string | null;
}

interface Props {
    category: DownloadableCategory;
}

export default function EditDownloadableCategory({ category }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Downloadable Categories',
            href: '/DownloadableCategories',
        },
        {
            title: 'Edit Category',
            href: `/DownloadableCategories/${category.id}/edit`, // Now category is available
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        category_name: category.category_name,
        description: category.description || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/DownloadableCategories/${category.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Downloadable Category" />
            <div className="m-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Edit Downloadable Category</h2>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="category_name">Category Name</Label>
                                <Input
                                    id="category_name"
                                    placeholder="Enter category name"
                                    name="category_name"
                                    type="text"
                                    value={data.category_name}
                                    onChange={(e) => setData('category_name', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.category_name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.category_name}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="description">Description (Optional)</Label>
                                <textarea
                                    id="description"
                                    placeholder="Enter the description"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    rows={3}
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="min-w-24"
                                >
                                    {processing ? 'Updating...' : 'Update Category'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
