import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import { Calendar, ArrowLeft, FileText } from 'lucide-react';

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
    return (
        <FrontLayout title={news.title}>
            {/* Hero Banner */}
            <section className="relative overflow-hidden bg-[#1B3A6B] py-16">
                {news.image ? (
                    <>
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(/storage/${news.image})` }}
                        />
                        <div className="absolute inset-0 bg-[#1B3A6B]/80" />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A6B] via-[#4A7AAC]/50 to-[#2E6B6B]/50" />
                )}
                <div className="relative mx-auto max-w-4xl px-4 text-center">
                    <div className="mb-3 flex items-center justify-center gap-2 text-sm text-[#F0F4F8]/70">
                        <Calendar size={14} />
                        {new Date(news.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </div>
                    <h1 className="text-3xl font-extrabold text-[#F0F4F8] md:text-4xl">
                        {news.title}
                    </h1>
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="bg-[#D6D8DC]/30">
                <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-[#2C2C2C]/60">
                    <Link href="/" className="hover:text-[#1B3A6B]">Home</Link>
                    <span>/</span>
                    <Link href="/news" className="hover:text-[#1B3A6B]">News & Updates</Link>
                    <span>/</span>
                    <span className="line-clamp-1 font-medium text-[#1B3A6B]">{news.title}</span>
                </div>
            </div>

            {/* Content */}
            <section className="bg-white py-12">
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
                    <div className="prose prose-lg max-w-none text-[#2C2C2C]/80">
                        <p className="whitespace-pre-line leading-relaxed">{news.content}</p>
                    </div>

                    {/* News Details */}
                    {news.news_details && news.news_details.length > 0 && (
                        <div className="mt-10 space-y-6">
                            <h3 className="text-xl font-bold text-[#1B3A6B]">Additional Details</h3>
                            {news.news_details.map((detail) => (
                                <div
                                    key={detail.id}
                                    className="rounded-xl bg-[#D6D8DC]/20 p-6"
                                >
                                    <p className="whitespace-pre-line leading-relaxed text-[#2C2C2C]/70">
                                        {detail.content}
                                    </p>
                                    {detail.pdf_files && (
                                        <a
                                            href={`/storage/${detail.pdf_files}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#1B3A6B] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#142D54]"
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
                            className="inline-flex items-center gap-2 text-sm font-medium text-[#2E6B6B] transition hover:text-[#1B3A6B]"
                        >
                            <ArrowLeft size={16} /> Back to News & Updates
                        </Link>
                    </div>
                </div>
            </section>
        </FrontLayout>
    );
}
