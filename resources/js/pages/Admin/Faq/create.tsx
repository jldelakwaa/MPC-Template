import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface FaqCategory {
    id: number;
    title: string;
}

interface Props {
    categories: FaqCategory[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Faq',
        href: '/Faq',
    },
    {
        title: 'Create New Faq',
        href: '/Faq/create',
    },
];

export default function CreateFaq({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        faqs_categoryid: categories[0]?.id.toString() || '',
        question: '',
        answer: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/Faq');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Faq" />
            <div className="m-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    <div className="rounded-xl border-0 bg-card shadow-md overflow-hidden">
                        <div className="h-1.5 bg-primary" />
                        <div className="p-6">
                        <h2 className="mb-6 text-2xl font-bold">Create New Faq</h2>
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
                                {errors.faqs_categoryid && <p className="mt-1 text-sm text-destructive">{errors.faqs_categoryid}</p>}
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
                                {errors.question && <p className="mt-1 text-sm text-destructive">{errors.question}</p>}
                            </div>

                            <div>
                                <Label htmlFor="answer">Answer</Label>
                                <Textarea
                                    id="answer"
                                    placeholder="Enter the answer"
                                    name="answer"
                                    value={data.answer}
                                    onChange={(e) => setData('answer', e.target.value)}
                                    className="mt-1 min-h-[150px]"
                                />
                                {errors.answer && <p className="mt-1 text-sm text-destructive">{errors.answer}</p>}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Faq'}
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
