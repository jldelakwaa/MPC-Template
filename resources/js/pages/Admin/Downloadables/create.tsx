import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

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
        title: 'Create New Downloadable',
        href: '/Downloadables/create',
    },
];

export default function CreateDownloadable({ categories }: Props) {
    const [selectedFileName, setSelectedFileName] = useState<string>('');
    const [fileSizeError, setFileSizeError] = useState<string>('');

    const { data, setData, post, processing, errors } = useForm({
        downloadable_category_id: 0,
        title: '',
        file: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFileSizeError('');

        if (file) {
            // Check file size (10MB = 10 * 1024 * 1024 bytes)
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                setFileSizeError('File size must be less than 10MB');
                setSelectedFileName('');
                setData('file', null);
                e.target.value = '';
                return;
            }

            setSelectedFileName(file.name);
            setData('file', file);
        } else {
            setSelectedFileName('');
            setData('file', null);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/Downloadables', {
            forceFormData: true,
            onSuccess: () => {
                window.Swal.fire('Success', 'Downloadable created successfully.', 'success');
                // Reset form after successful submission
                setData({
                    downloadable_category_id: '',
                    title: '',
                    file: null,
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Downloadable" />
            <div className="m-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Create New Downloadable</h2>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="downloadable_category_id">Category *</Label>
                                <Select
                                    value={data.downloadable_category_id ? data.downloadable_category_id.toString() : ''}
                                    onValueChange={(value) => setData('downloadable_category_id', parseInt(value, 10))}
                                    required
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

                            {/* File Upload */}
                            <div>
                                <Label htmlFor="file">File *</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="mt-1"
                                    required
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
                                />

                                {/* Selected File Preview */}
                                {selectedFileName && (
                                    <div className="mt-2 flex items-center gap-2 rounded-md border border-green-200 bg-green-50 p-2">
                                        <span className="text-green-600">📄</span>
                                        <span className="text-sm font-medium text-green-700">
                                            Selected: {selectedFileName}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedFileName('');
                                                setData('file', null);
                                                const fileInput = document.getElementById('file') as HTMLInputElement;
                                                if (fileInput) fileInput.value = '';
                                            }}
                                            className="ml-auto text-green-600 hover:text-green-800"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}

                                {/* File Size Error */}
                                {fileSizeError && (
                                    <p className="mt-1 text-sm text-red-600">{fileSizeError}</p>
                                )}

                                {/* Backend Errors */}
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
