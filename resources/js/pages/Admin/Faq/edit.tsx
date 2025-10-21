import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Faq {
    id: number;
    faqs_categoryid: number | null;
    question: string;
    answer: string;
}

interface FaqCategory {
    id: number;
    title: string;
}

interface Props {
    faq: Faq;
    categories: FaqCategory[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Faq',
        href: '/Faq',
    },
    {
        title: 'Edit Faq',
        href: '#',
    },
];

export default function Edit({ faq, categories }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        faqs_categoryid: faq.faqs_categoryid?.toString() || '',
        question: faq.question,
        answer: faq.answer,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/Faq/${faq.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Faq" />
            <div className="m-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold">Edit Faq</h2>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="faqs_categoryid">Category</Label>
                                <Select value={data.faqs_categoryid} onValueChange={(value) => setData('faqs_categoryid', value)}>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.faqs_categoryid && <p className="mt-1 text-sm text-red-600">{errors.faqs_categoryid}</p>}
                            </div>

                            <div>
                                <Label htmlFor="question">Question</Label>
                                <Input
                                    id="question"
                                    placeholder="Enter the question"
                                    name="question"
                                    type="text"
                                    value={data.question}
                                    onChange={(e) => setData('question', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.question && <p className="mt-1 text-sm text-red-600">{errors.question}</p>}
                            </div>

                            <div>
                                <Label htmlFor="answer">Answer</Label>
                                <textarea
                                    id="answer"
                                    placeholder="Enter the answer"
                                    name="answer"
                                    value={data.answer}
                                    onChange={(e) => setData('answer', e.target.value)}
                                    className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    rows={6}
                                />
                                {errors.answer && <p className="mt-1 text-sm text-red-600">{errors.answer}</p>}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Faq'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
