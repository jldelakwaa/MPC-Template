import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import Breadcrumb from '@/components/Breadcrumb';
import FrontHero from '@/components/FrontHero';
import { ArrowLeft, FileText } from 'lucide-react';

interface NewsDetail {
    id: number;
    news_update_id: number;
    content: string;
    pdf_files: string | null;
}

interface NewsUpdate {
    id: number;
    title: string;
    content: string;
    year: string;
    image: string | null;
    created_at: string;
    news_details: NewsDetail[];
}

interface Props {
    news: NewsUpdate;
}

export default function NewsShow({ news }: Props) {
    const publishedDate = new Date(news.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <FrontLayout title={news.title}>
            {/* Hero Banner */}
            <FrontHero
                eyebrow="News Update"
                title={news.title}
                subtitle={`Published ${publishedDate}`}
            />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'News & Updates', href: '/news' },
                    { label: news.title },
                ]}
            />

            {/* Content */}
            <section className="bg-card py-12">
                <div className="mx-auto max-w-4xl px-4">
                    {news.image && (
                        <div className="mb-8 overflow-hidden rounded-xl">
                            <img
                                src={`/storage/${news.image}`}
                                alt={news.title}
                                className="w-full object-cover"
                            />
                        </div>
                    )}
                    <div className="prose prose-lg max-w-none text-foreground/80">
                        <p className="whitespace-pre-line leading-relaxed">{news.content}</p>
                    </div>

                    {/* News Details */}
                    {news.news_details && news.news_details.length > 0 && (
                        <div className="mt-10 space-y-6">
                            <h3 className="text-xl font-bold text-foreground">Additional Details</h3>
                            {news.news_details.map((detail) => (
                                <div
                                    key={detail.id}
                                    className="rounded-xl bg-brand-border/20 p-6"
                                >
                                    <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
                                        {detail.content}
                                    </p>
                                    {detail.pdf_files && (
                                        <a
                                            href={`/storage/${detail.pdf_files}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-navy-dark"
                                        >
                                            <FileText size={16} /> View Attachment
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Back Link */}
                    <div className="mt-10">
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-sm font-medium text-brand-teal transition hover:text-foreground"
                        >
                            <ArrowLeft size={16} /> Back to News & Updates
                        </Link>
                    </div>
                </div>
            </section>
        </FrontLayout>
    );
}

