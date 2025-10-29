import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Category {
    id: number;
    category_name: string;
}

interface Props {
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Downloadables',
        href: '/Downloadables',
    },
    {
        title: 'Create New Downloadable Form',
        href: '/Downloadables/create',
    },
];

export default function CreateDownloadable({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        downloadable_category_id: null as number | null,
        title: '',
        description: '',
        file: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/Downloadables');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Downloadable" />
            <div className="m-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Create New Downloadable</h2>
                        <form onSubmit={submit} className="space-y-4">
                            {/* Category Selection */}
                            <div>
                                <Label htmlFor="downloadable_category_id">Category</Label>
                                <Select
                                    value={data.downloadable_category_id?.toString() || ''}
                                    onValueChange={(value) => setData('downloadable_category_id', value ? parseInt(value, 10) : null)}
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.category_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.downloadable_category_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.downloadable_category_id}</p>
                                )}
                            </div>

                            {/* Title Input */}
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter the title"
                                    name="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>

                            {/* Description Textarea */}
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    placeholder="Enter the description"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    rows={6}
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            {/* File Upload */}
                            <div>
                                <Label htmlFor="file">File</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={(e) => setData('file', e.target.files ? e.target.files[0] : null)}
                                    className="mt-1"
                                />
                                {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Downloadable'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
