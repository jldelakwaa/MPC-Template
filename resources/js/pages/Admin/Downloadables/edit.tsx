import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Downloadable {
    id: number;
    title: string;
    description: string | null;
    file_path: string;
    downloadable_category_id: number;
}

interface Category {
    id: number;
    category_name: string;
}

interface Props {
    downloadable: Downloadable;
    categories: Category[];
}

export default function EditDownloadable({ downloadable, categories }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Downloadables',
            href: '/Downloadables',
        },
        {
            title: 'Edit Downloadable',
            href: `/Downloadables/${downloadable.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        _method: 'PUT',
        downloadable_category_id: downloadable.downloadable_category_id,
        title: downloadable.title,
        description: downloadable.description || '',
        file: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/Downloadables/${downloadable.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Downloadable" />
            <div className="m-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Edit Downloadable</h2>
                        <form onSubmit={submit} className="space-y-4">
                            {/* Category Selection */}
                            <div>
                                <Label htmlFor="downloadable_category_id">Category *</Label>
                                <Select
                                    value={data.downloadable_category_id.toString()}
                                    onValueChange={(value) => setData('downloadable_category_id', parseInt(value, 10))}
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
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter downloadable title"
                                    name="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1"
                                    required
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
                                    className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    rows={4}
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            {/* Current File Display */}
                            <div>
                                <Label>Current File</Label>
                                <div className="mt-1">
                                    {downloadable.file_path ? (
                                        <a
                                            href={`/storage/${downloadable.file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-600 hover:underline"
                                        >
                                            📄 View Current File
                                        </a>
                                    ) : (
                                        <span className="text-muted-foreground italic">No file uploaded</span>
                                    )}
                                </div>
                            </div>

                            {/* File Upload */}
                            <div>
                                <Label htmlFor="file">New File (Leave blank to keep current file)</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                    className="mt-1"
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
                                />
                                {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>}
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Supported formats: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, ZIP, RAR. Max size: 10MB.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-2 pt-4">
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
                                    {processing ? 'Updating...' : 'Update Downloadable'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
