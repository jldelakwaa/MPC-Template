// cspell:ignore inertiajs
import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import Breadcrumb from '@/components/Breadcrumb';
import FrontHero from '@/components/FrontHero';
import { HelpCircle, ChevronDown, Search, MessageCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export interface FaqAnswer {
    text: string;
    details?: string[];
    // when provided, controls the icon used for each detail line
    detailsType?: 'check' | 'bullet' | 'number';
}

export interface FaqItem {
    id: number;
    question: string;
    answers: FaqAnswer[];
    faq_category?: { id: number; title: string };
}

export interface FaqCategory {
    id: number;
    title: string;
    description: string | null;
}

interface FaqApiItem {
    id: number;
    question: string;
    answer: string;
    faqs_categoryid?: number | null;
    faq_category?: { id: number; title: string };
    faqCategory?: { id: number; title: string };
}

function parseAnswer(answer: string): FaqAnswer[] {
    const sections = answer
        .split(/\n\s*\n/)
        .map((section) => section.trim())
        .filter(Boolean);

    if (sections.length === 0) {
        return [{ text: answer.trim() }];
    }

    return sections.map((section) => {
        const lines = section.split('\n').map((line) => line.trim()).filter(Boolean);

        if (lines.length === 1) {
            return { text: lines[0] };
        }

        const title = lines[0];
        const detailLines = lines.slice(1);
        const isNumbered = detailLines.every((line) => /^\d+[).]/.test(line));
        const details = detailLines.map((line) => line.replace(/^[-•\d.)]+\s*/, '').trim());

        return {
            text: title,
            details,
            detailsType: isNumbered ? 'number' : 'bullet',
        };
    });
}

export default function Faqs({ faqs = [], categories = [] }: { faqs?: FaqApiItem[]; categories?: FaqCategory[] }) {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [search, setSearch] = useState('');

    const mappedFaqs: FaqItem[] = faqs.map((faq) => {
        const category = faq.faq_category ?? faq.faqCategory ?? null;
        return {
            id: faq.id,
            question: faq.question,
            answers: parseAnswer(faq.answer || ''),
            faq_category: category ? { id: category.id, title: category.title } : undefined,
        };
    });

    const filtered = mappedFaqs.filter((faq) => {
        const matchesCategory = activeCategory
            ? faq.faq_category?.id === activeCategory
            : true;

        const matchesSearch = search
            ? faq.question.toLowerCase().includes(search.toLowerCase()) ||
              faq.answers.some((ans) =>
                  ans.text.toLowerCase().includes(search.toLowerCase()) ||
                  ans.details?.some((d) => d.toLowerCase().includes(search.toLowerCase()))
              )
            : true;
        return matchesCategory && matchesSearch;
    });

    return (
        <FrontLayout title="FAQs">
            {/* Hero Banner */}
            <FrontHero
                eyebrow="Support"
                title="Frequently Asked Questions"
                subtitle="Clear answers to common concerns."
            />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'FAQs' },
                ]}
            />

            {/* Search & Filter */}
            <section className="bg-card py-8">
                <div className="mx-auto max-w-4xl px-4">
                    <div className="relative mb-6">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40"
                        />
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-border bg-brand-surface py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                        />
                    </div>
                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveCategory(null)}
                                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                                    activeCategory === null
                                        ? 'bg-brand-navy text-white'
                                        : 'bg-brand-border/40 text-foreground hover:bg-brand-border'
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
                                            ? 'bg-brand-navy text-white'
                                            : 'bg-brand-border/40 text-foreground hover:bg-brand-border'
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
            <section className="bg-brand-surface py-12">
                <div className="mx-auto max-w-4xl px-4">
                    {filtered.length > 0 ? (
                        <div className="space-y-3">
                            {filtered.map((faq) => (
                                <div
                                    key={faq.id}
                                    className="overflow-hidden rounded-xl bg-card shadow-sm"
                                >
                                    <button
                                        onClick={() =>
                                            setOpenFaq(openFaq === faq.id ? null : faq.id)
                                        }
                                        className="flex w-full items-center justify-between p-5 text-left transition hover:bg-brand-border/10"
                                    >
                                        <div className="flex items-start gap-3">
                                            <HelpCircle
                                                size={20}
                                                className="mt-0.5 shrink-0 text-brand-teal"
                                            />
                                            <span className="font-semibold text-foreground">
                                                {faq.question}
                                            </span>
                                        </div>
                                        <ChevronDown
                                            size={18}
                                            className={`shrink-0 text-foreground/40 transition-transform ${
                                                openFaq === faq.id ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                    {openFaq === faq.id && (
                                        <div className="border-t border-border/40 px-5 py-4 pl-12">
                                            {faq.answers.map((ans, idx) => (
                                                <div key={idx} className="mb-3">
                                                    <p className="leading-relaxed text-muted-foreground">
                                                        <strong className="font-semibold text-foreground">
                                                            {ans.text}
                                                        </strong>
                                                    </p>
                                                    {ans.details && ans.details.length > 0 && (
                                                        <ul
                                                            className={
                                                                `mt-2 pl-6 space-y-1 text-muted-foreground ` +
                                                                (ans.detailsType === 'check'
                                                                    ? 'list-none'
                                                                    : ans.detailsType === 'number'
                                                                    ? 'list-decimal'
                                                                    : 'list-disc')
                                                            }
                                                        >
                                                            {ans.details.map((d, j) => (
                                                                <li
                                                                    key={j}
                                                                    className={
                                                                        ans.detailsType === 'check'
                                                                            ? 'mb-1 flex items-start gap-2'
                                                                            : 'mb-1'
                                                                    }
                                                                >
                                                                    {ans.detailsType === 'check' && (
                                                                        <CheckCircle
                                                                            size={14}
                                                                            className="mt-0.5 shrink-0 text-brand-teal"
                                                                        />
                                                                    )}
                                                                    {d}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}
                                            {faq.faq_category && (
                                                <span className="mt-3 inline-block rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-medium text-brand-teal">
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
                            <MessageCircle className="mx-auto mb-4 text-brand-border" size={48} />
                            <p className="text-lg text-muted-foreground">
                                {search ? 'No questions match your search.' : 'No FAQs available yet.'}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-brand-navy to-brand-blue py-14">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-white">
                        Still Have Questions?
                    </h2>
                    <p className="mx-auto mb-6 max-w-xl text-white/80">
                        Don't hesitate to reach out — our team is here to help.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-lg bg-brand-teal px-7 py-3 font-semibold text-white transition hover:bg-brand-teal-dark"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>
        </FrontLayout>
    );
}

