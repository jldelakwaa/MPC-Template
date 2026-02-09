import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { FileText } from 'lucide-react';

interface NewsDetail {
    id: number;
    news_update_id: number;
    content: string;
    pdf_files: string | null;
}

interface NewsUpdate {
    id: number;
    title: string;
}

interface Props {
    newsDetail: NewsDetail;
    news: NewsUpdate;
}

export default function Edit({ newsDetail, news }: Props) {
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
            title: 'Edit Detail',
            href: `/News/${news.id}/details/${newsDetail.id}/edit`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        content: newsDetail.content,
        pdf_files: null as File | null,
        remove_pdf: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/News/${news.id}/details/${newsDetail.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit News Detail" />
            <div className="m-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Edit Detail</h2>
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
                                <Label htmlFor="pdf_files">PDF Document</Label>
                                {newsDetail.pdf_files && !data.remove_pdf && (
                                    <div className="mt-2 rounded border bg-muted p-3">
                                        <div className="flex items-center justify-between">
                                            <a
                                                href={`/storage/${newsDetail.pdf_files}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-blue-600 hover:underline"
                                            >
                                                <FileText className="mr-2 h-4 w-4" />
                                                View Current PDF
                                            </a>
                                        </div>
                                        <div className="mt-2 flex items-center">
                                            <Checkbox
                                                id="remove_pdf"
                                                checked={data.remove_pdf}
                                                onCheckedChange={(checked) => setData('remove_pdf', !!checked)}
                                            />
                                            <Label htmlFor="remove_pdf" className="ml-2 cursor-pointer">
                                                Remove current PDF
                                            </Label>
                                        </div>
                                    </div>
                                )}
                                <Input
                                    id="pdf_files"
                                    name="pdf_files"
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setData('pdf_files', e.target.files?.[0] || null)}
                                    className="mt-1"
                                />
                                {errors.pdf_files && <p className="mt-1 text-sm text-red-600">{errors.pdf_files}</p>}
                                <p className="mt-1 text-sm text-muted-foreground">Upload a new PDF to replace the current one. Max size: 20MB.</p>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={() => router.get(`/News/${news.id}/details`)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing} className="min-w-24">
                                    {processing ? 'Updating...' : 'Update Detail'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
