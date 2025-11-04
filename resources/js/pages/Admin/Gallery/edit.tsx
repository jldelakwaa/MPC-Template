import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface GalleryCategory {
    id: number;
    name: string;
}

interface Gallery {
    id: number;
    title: string;
    description: string;
    category_id: number;
    year: string;
    image: string | null;
}

interface Props {
    gallery: Gallery;
    categories: GalleryCategory[];
}

export default function Edit({ gallery, categories }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Gallery',
            href: '/Gallery',
        },
        {
            title: 'Edit Gallery Item',
            href: `/Gallery/${gallery.id}/edit`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: gallery.title,
        description: gallery.description,
        category_id: gallery.category_id.toString(),
        year: new Date(gallery.year).toISOString().split('T')[0],
        image: null as File | null,
        remove_image: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/Gallery/${gallery.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Gallery Item" />
            <div className="m-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Edit Gallery Item</h2>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="category_id">Category</Label>
                                <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)}>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter gallery item title"
                                    name="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    placeholder="Enter gallery item description"
                                    name="description"
                                    type="text"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>
                            <div>
                                <Label htmlFor="year">Year</Label>
                                <Input
                                    id="year"
                                    placeholder="Enter year"
                                    name="year"
                                    type="date"
                                    value={data.year}
                                    onChange={(e) => setData('year', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                            </div>

                            <div>
                                <Label htmlFor="image">Image</Label>
                                {gallery.image && !data.image && (
                                    <div className="mt-2">
                                        <img src={`/storage/${gallery.image}`} alt={gallery.title} className="h-20 w-20 rounded-md object-cover" />
                                        <div className="mt-2 flex items-center">
                                            <Checkbox
                                                id="remove_image"
                                                checked={data.remove_image}
                                                onCheckedChange={(checked) => setData('remove_image', !!checked)}
                                            />
                                            <Label htmlFor="remove_image" className="ml-2">
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
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => router.get('/Gallery')}>
 Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Item'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
