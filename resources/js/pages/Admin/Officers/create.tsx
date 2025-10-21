import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface OfficerCategory {
    id: number;
    name: string;
}

interface Props {
    categories: OfficerCategory[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Officers',
        href: '/Officers',
    },
    {
        title: 'Create New Officer',
        href: '/Officers/create',
    },
];

export default function Index({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        officer_category_id: 'none',
        name: '',
        position: '',
        birthday: '',
        yearservice: '',
        image: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/Officers', {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Officer" />
            <div className="m-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Create New Officer</h2>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="officer_category_id">Category</Label>
                                <Select value={data.officer_category_id} onValueChange={(value) => setData('officer_category_id', value)}>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select a category (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">No Category</SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.officer_category_id && <p className="mt-1 text-sm text-red-600">{errors.officer_category_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter officer name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="position">Position</Label>
                                <Input
                                    id="position"
                                    placeholder="Enter officer position"
                                    name="position"
                                    type="text"
                                    value={data.position}
                                    onChange={(e) => setData('position', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
                            </div>

                            <div>
                                <Label htmlFor="birthday">Birthday</Label>
                                <Input
                                    id="birthday"
                                    placeholder="Enter officer birthday"
                                    name="birthday"
                                    type="date"
                                    value={data.birthday}
                                    onChange={(e) => setData('birthday', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.birthday && <p className="mt-1 text-sm text-red-600">{errors.birthday}</p>}
                            </div>
                            <div>
                                <Label htmlFor="yearservice">Year Service</Label>
                                <Input
                                    id="yearservice"
                                    placeholder="Enter officer year of service"
                                    name="yearservice"
                                    type="date"
                                    value={data.yearservice}
                                    onChange={(e) => setData('yearservice', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.yearservice && <p className="mt-1 text-sm text-red-600">{errors.yearservice}</p>}
                            </div>

                            <div>
                                <Label htmlFor="image">Image</Label>
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
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Officer'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
