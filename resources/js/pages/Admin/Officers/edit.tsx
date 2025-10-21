import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Officer {
    id: number;
    officer_category_id: number | null;
    name: string;
    position: string;
    birthday: string;
    yearservice: string;
    image: string | null;
}

interface OfficerCategory {
    id: number;
    name: string;
}

interface Props {
    officer: Officer;
    categories: OfficerCategory[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Officers',
        href: '/Officers',
    },
    {
        title: 'Edit Officer',
        href: '#',
    },
];

export default function Edit({ officer, categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        officer_category_id: officer.officer_category_id?.toString() || 'none',
        name: officer.name,
        position: officer.position,
        birthday: officer.birthday,
        yearservice: officer.yearservice,
        image: null as File | null,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/Officers/${officer.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Officer" />
            <div className="m-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Edit Officer</h2>
                        <form onSubmit={submit} className="space-y-4">
                            {officer.image && (
                                <div className="mb-4">
                                    <Label className="flex justify-self-center">Current Image</Label>
                                    <div className="mt-2 flex justify-center">
                                        <img src={`/storage/${officer.image}`} alt={officer.name} className="h-32 w-32 rounded-full object-cover" />
                                    </div>
                                </div>
                            )}

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
                                <Label htmlFor="image">Image (optional - leave empty to keep current)</Label>
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
                                    {processing ? 'Updating...' : 'Update Officer'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
