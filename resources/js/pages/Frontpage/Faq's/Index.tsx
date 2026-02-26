import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import { HelpCircle, ChevronDown, Search, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface FaqItem {
    id: number;
    question: string;
    answer: string;
    faq_category?: { id: number; title: string };
}

interface FaqCategory {
    id: number;
    title: string;
    description: string | null;
}

interface Props {
    faqs: FaqItem[];
    categories: FaqCategory[];
}

export default function Faqs({ faqs = [], categories = [] }: Props) {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [search, setSearch] = useState('');

    const filtered = faqs.filter((faq) => {
        const matchesCategory = activeCategory
            ? faq.faq_category?.id === activeCategory
            : true;
        const matchesSearch = search
            ? faq.question.toLowerCase().includes(search.toLowerCase()) ||
              faq.answer.toLowerCase().includes(search.toLowerCase())
            : true;
        return matchesCategory && matchesSearch;
    });

    return (
        <FrontLayout title="FAQs">
            {/* Hero Banner */}
            <section className="bg-gradient-to-br from-[#1B3A6B] via-[#4A7AAC]/50 to-[#2E6B6B]/50 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-[#F0F4F8]">
                        Frequently Asked Questions
                    </h1>
                    <p className="mt-3 text-lg text-[#F0F4F8]/70">
                        Find answers to common questions about our services
                    </p>
                    <div className="mx-auto mt-3 h-1 w-16 rounded bg-[#2E6B6B]" />
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="bg-[#D6D8DC]/30">
                <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-[#2C2C2C]/60">
                    <Link href="/" className="hover:text-[#1B3A6B]">Home</Link>
                    <span>/</span>
                    <span className="font-medium text-[#1B3A6B]">FAQs</span>
                </div>
            </div>

            {/* Search & Filter */}
            <section className="bg-white py-8">
                <div className="mx-auto max-w-4xl px-4">
                    <div className="relative mb-6">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2C2C2C]/40"
                        />
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-[#D6D8DC] bg-[#f7f8fa] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#4A7AAC] focus:ring-2 focus:ring-[#4A7AAC]/20"
                        />
                    </div>
                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveCategory(null)}
                                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                                    activeCategory === null
                                        ? 'bg-[#1B3A6B] text-white'
                                        : 'bg-[#D6D8DC]/40 text-[#2C2C2C] hover:bg-[#D6D8DC]'
                                }`}
                            >
                                All
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                                        activeCategory === cat.id
                                            ? 'bg-[#1B3A6B] text-white'
                                            : 'bg-[#D6D8DC]/40 text-[#2C2C2C] hover:bg-[#D6D8DC]'
                                    }`}
                                >
                                    {cat.title}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* FAQ List */}
            <section className="bg-[#f7f8fa] py-12">
                <div className="mx-auto max-w-4xl px-4">
                    {filtered.length > 0 ? (
                        <div className="space-y-3">
                            {filtered.map((faq) => (
                                <div
                                    key={faq.id}
                                    className="overflow-hidden rounded-xl bg-white shadow-sm"
                                >
                                    <button
                                        onClick={() =>
                                            setOpenFaq(openFaq === faq.id ? null : faq.id)
                                        }
                                        className="flex w-full items-center justify-between p-5 text-left transition hover:bg-[#D6D8DC]/10"
                                    >
                                        <div className="flex items-start gap-3">
                                            <HelpCircle
                                                size={20}
                                                className="mt-0.5 shrink-0 text-[#2E6B6B]"
                                            />
                                            <span className="font-semibold text-[#1B3A6B]">
                                                {faq.question}
                                            </span>
                                        </div>
                                        <ChevronDown
                                            size={18}
                                            className={`shrink-0 text-[#2C2C2C]/40 transition-transform ${
                                                openFaq === faq.id ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                    {openFaq === faq.id && (
                                        <div className="border-t border-[#D6D8DC]/40 px-5 py-4 pl-12">
                                            <p className="whitespace-pre-line leading-relaxed text-[#2C2C2C]/70">
                                                {faq.answer}
                                            </p>
                                            {faq.faq_category && (
                                                <span className="mt-3 inline-block rounded-full bg-[#2E6B6B]/10 px-3 py-1 text-xs font-medium text-[#2E6B6B]">
                                                    {faq.faq_category.title}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <MessageCircle className="mx-auto mb-4 text-[#D6D8DC]" size={48} />
                            <p className="text-lg text-[#2C2C2C]/50">
                                {search ? 'No questions match your search.' : 'No FAQs available yet.'}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-[#1B3A6B] to-[#4A7AAC] py-14">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-white">
                        Still Have Questions?
                    </h2>
                    <p className="mx-auto mb-6 max-w-xl text-white/80">
                        Don't hesitate to reach out — our team is here to help.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#2E6B6B] px-7 py-3 font-semibold text-white transition hover:bg-[#245858]"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>
        </FrontLayout>
    );
}
