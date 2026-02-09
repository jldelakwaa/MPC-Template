import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface NewsUpdate {
    id: number;
    title: string;
}

interface Props {
    news: NewsUpdate;
}

export default function Create({ news }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'News & Updates',
            href: '/News',
        },
        {
            title: news.title,
            href: `/News/${news.id}/details`,
        },
        {
            title: 'Add Detail',
            href: `/News/${news.id}/details/create`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        content: '',
        pdf_files: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/News/${news.id}/details`, {
            forceFormData: true,
            onSuccess: () => {
                setData({
                    content: '',
                    pdf_files: null,
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add News Detail" />
            <div className="m-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Add Detail to {news.title}</h2>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    placeholder="Enter detailed content..."
                                    name="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className="mt-1 min-h-[200px]"
                                />
                                {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                            </div>

                            <div>
                                <Label htmlFor="pdf_files">PDF Document (Optional)</Label>
                                <Input
                                    id="pdf_files"
                                    name="pdf_files"
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setData('pdf_files', e.target.files?.[0] || null)}
                                    className="mt-1"
                                />
                                {errors.pdf_files && <p className="mt-1 text-sm text-red-600">{errors.pdf_files}</p>}
                                <p className="mt-1 text-sm text-muted-foreground">Upload a PDF document to attach to this detail. Max size: 20MB.</p>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={() => router.get(`/News/${news.id}/details`)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing} className="min-w-24">
                                    {processing ? 'Adding...' : 'Add Detail'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
