import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
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
            <section className="bg-gradient-to-br from-[#1B3A6B] via-[#4A7AAC]/50 to-[#2E6B6B]/50 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-[#F0F4F8]">News & Updates</h1>
                    <p className="mt-3 text-lg text-[#F0F4F8]/70">
                        Stay informed with the latest from our cooperative
                    </p>
                    <div className="mx-auto mt-3 h-1 w-16 rounded bg-[#2E6B6B]" />
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="bg-[#D6D8DC]/30">
                <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-[#2C2C2C]/60">
                    <Link href="/" className="hover:text-[#1B3A6B]">Home</Link>
                    <span>/</span>
                    <span className="font-medium text-[#1B3A6B]">News & Updates</span>
                </div>
            </div>

            {/* News Grid */}
            <section className="bg-[#f7f8fa] py-12">
                <div className="mx-auto max-w-7xl px-4">
                    {news.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {news.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/news/${item.id}`}
                                    className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
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
                                        <div className="flex h-52 items-center justify-center bg-gradient-to-br from-[#1B3A6B] to-[#4A7AAC]">
                                            <Newspaper size={48} className="text-white/20" />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#2E6B6B]">
                                            <Calendar size={14} />
                                            {new Date(item.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-[#1B3A6B] group-hover:text-[#4A7AAC]">
                                            {item.title}
                                        </h3>
                                        <p className="line-clamp-3 text-sm leading-relaxed text-[#2C2C2C]/70">
                                            {item.content}
                                        </p>
                                        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#2E6B6B]">
                                            Read More <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <Newspaper className="mx-auto mb-4 text-[#D6D8DC]" size={48} />
                            <p className="text-lg text-[#2C2C2C]/50">No news available yet.</p>
                        </div>
                    )}
                </div>
            </section>
        </FrontLayout>
    );
}
