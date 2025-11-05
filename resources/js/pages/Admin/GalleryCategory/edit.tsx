import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface GalleryCategory {
    id: number;
    category_name: string;
}

interface Props {
    category: GalleryCategory;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gallery Categories',
        href: '/GalleryCategory',
    },
    {
        title: 'Edit Category',
        href: '#',
    },
];

export default function Edit({ category }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        category_name: category.category_name,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/GalleryCategory/${category.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Gallery Category" />
            <div className="m-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Edit Gallery Category</h2>
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

                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
