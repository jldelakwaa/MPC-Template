import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'HomePage Images',
        href: '/HomePage',
    },
    {
        title: 'Create New Image',
        href: '/HomePage/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        image: null as File | null,
        content: '',
        button_link: '',
        button_text: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/HomePage');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New HomePage Image" />
            <div className="m-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="rounded-xl border-0 bg-card shadow-md overflow-hidden">
                        <div className="h-1.5 bg-primary" />
                        <div className="p-6">
                        <h2 className="mb-6 text-2xl font-bold">Create New HomePage Image</h2>
                        <form onSubmit={submit} className="space-y-4" encType="multipart/form-data">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter title"
                                    name="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.title && <p className="mt-1 text-sm text-destructive">{errors.title}</p>}
                            </div>

                            <div>
                                <Label htmlFor="image">Image</Label>
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.gif,.webp"
                                    onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                    className="mt-1 cursor-pointer file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-brand-navy file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:transition-colors hover:file:bg-brand-navy-dark"
                                />
                                {errors.image && <p className="mt-1 text-sm text-destructive">{errors.image}</p>}
                            </div>

                            <div>
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    placeholder="Enter content"
                                    name="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className="mt-1 min-h-[120px]"
                                />
                                {errors.content && <p className="mt-1 text-sm text-destructive">{errors.content}</p>}
                            </div>

                            <div>
                                <Label htmlFor="button_text">Button Text</Label>
                                <Input
                                    id="button_text"
                                    placeholder="Enter button text (optional)"
                                    name="button_text"
                                    type="text"
                                    value={data.button_text}
                                    onChange={(e) => setData('button_text', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.button_text && <p className="mt-1 text-sm text-destructive">{errors.button_text}</p>}
                            </div>

                            <div>
                                <Label htmlFor="button_link">Button Link</Label>
                                <Input
                                    id="button_link"
                                    placeholder="Enter button link (optional)"
                                    name="button_link"
                                    type="url"
                                    value={data.button_link}
                                    onChange={(e) => setData('button_link', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.button_link && <p className="mt-1 text-sm text-destructive">{errors.button_link}</p>}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Image'}
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
