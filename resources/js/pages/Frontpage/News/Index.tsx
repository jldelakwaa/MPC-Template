import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import Breadcrumb from '@/components/Breadcrumb';
import FrontHero from '@/components/FrontHero';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';

interface NewsUpdate {
    id: number;
    title: string;
    content: string;
    year: string;
    image: string | null;
    created_at: string;
}

interface Props {
    news: NewsUpdate[];
}

export default function NewsIndex({ news = [] }: Props) {
    return (
        <FrontLayout title="News & Updates">
            {/* Hero Banner */}
            <FrontHero
                eyebrow="Updates"
                title="News & Updates"
                subtitle="Verified updates from BOPEMPC."
            />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'News & Updates' },
                ]}
            />

            {/* News Grid */}
            <section className="bg-brand-surface py-12">
                <div className="mx-auto max-w-7xl px-4">
                    {news.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {news.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/news/${item.id}`}
                                    className="group overflow-hidden rounded-xl bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                                >
                                    {item.image ? (
                                        <div className="h-52 overflow-hidden">
                                            <img
                                                src={`/storage/${item.image}`}
                                                alt={item.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex h-52 items-center justify-center bg-gradient-to-br from-brand-navy to-brand-blue">
                                            <Newspaper size={48} className="text-white/20" />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-brand-teal">
                                            <Calendar size={14} />
                                            {new Date(item.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-brand-blue">
                                            {item.title}
                                        </h3>
                                        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                                            {item.content}
                                        </p>
                                        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-teal">
                                            Read More <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <Newspaper className="mx-auto mb-4 text-brand-border" size={48} />
                            <p className="text-lg text-muted-foreground">No news available yet.</p>
                        </div>
                    )}
                </div>
            </section>
        </FrontLayout>
    );
}

