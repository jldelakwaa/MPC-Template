import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
    content: string;
    year: number;
    image: string | null;
}

interface Props {
    news: NewsUpdate;
}

export default function Edit({ news }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'News & Updates',
            href: '/News',
        },
        {
            title: 'Edit News',
            href: `/News/${news.id}/edit`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: news.title,
        content: news.content,
        year: news.year,
        image: null as File | null,
        remove_image: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/News/${news.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit News" />
            <div className="m-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Edit News</h2>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter news title"
                                    name="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>

                            <div>
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    placeholder="Enter news content..."
                                    name="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className="mt-1 min-h-[200px]"
                                />
                                {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                            </div>

                            <div>
                                <Label htmlFor="year">Year</Label>
                                <Input
                                    id="year"
                                    name="year"
                                    type="number"
                                    min="1900"
                                    max={new Date().getFullYear() + 10}
                                    value={data.year}
                                    onChange={(e) => setData('year', parseInt(e.target.value))}
                                    className="mt-1"
                                />
                                {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                            </div>

                            <div>
                                <Label htmlFor="image">Featured Image</Label>
                                {news.image && !data.remove_image && (
                                    <div className="mt-2">
                                        <img src={`/storage/${news.image}`} alt={news.title} className="h-32 w-auto rounded-md object-cover" />
                                        <div className="mt-2 flex items-center">
                                            <Checkbox
                                                id="remove_image"
                                                checked={data.remove_image}
                                                onCheckedChange={(checked) => setData('remove_image', !!checked)}
                                            />
                                            <Label htmlFor="remove_image" className="ml-2 cursor-pointer">
                                                Remove current image
                                            </Label>
                                        </div>
                                    </div>
                                )}
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                    className="mt-1"
                                />
                                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Supported formats: JPEG, PNG, JPG, GIF. Max size: 10MB.
                                </p>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={() => router.get('/News')}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing} className="min-w-24">
                                    {processing ? 'Updating...' : 'Update News'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
