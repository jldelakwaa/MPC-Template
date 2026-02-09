import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface HomePageImage {
    id: number;
    title: string;
    image: string | null;
    content: string;
    button_link: string | null;
    button_text: string | null;
}

interface Props {
    homePageImage: HomePageImage;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'HomePage Images',
        href: '/HomePage',
    },
    {
        title: 'Edit Image',
        href: '#',
    },
];

export default function Edit({ homePageImage }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: homePageImage.title,
        image: null as File | null,
        content: homePageImage.content,
        button_link: homePageImage.button_link || '',
        button_text: homePageImage.button_text || '',
        remove_image: false,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/HomePage/${homePageImage.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit HomePage Image" />
            <div className="m-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Edit HomePage Image</h2>
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
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>

                            <div>
                                <Label htmlFor="image">Image</Label>
                                {homePageImage.image && (
                                    <div className="mb-2">
                                        <img src={`/storage/${homePageImage.image}`} alt={homePageImage.title} className="h-24 w-32 rounded object-cover" />
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
                                {homePageImage.image && (
                                    <div className="mt-2">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={data.remove_image}
                                                onChange={(e) => setData('remove_image', e.target.checked)}
                                                className="mr-2"
                                            />
                                            Remove current image
                                        </label>
                                    </div>
                                )}
                                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                            </div>

                            <div>
                                <Label htmlFor="content">Content</Label>
                                <textarea
                                    id="content"
                                    placeholder="Enter content"
                                    name="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    rows={4}
                                />
                                {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
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
                                {errors.button_text && <p className="mt-1 text-sm text-red-600">{errors.button_text}</p>}
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
                                {errors.button_link && <p className="mt-1 text-sm text-red-600">{errors.button_link}</p>}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Image'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
