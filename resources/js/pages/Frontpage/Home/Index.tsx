import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import FrontHero from '@/components/FrontHero';
import {
    Shield,
    Users,
    TrendingUp,
    ArrowRight,
} from 'lucide-react';
import { defaultSlides as fallbackSlides, homeServices as services, homeStats as stats } from '../_data/home.data';

interface HomePageImage {
    id: number;
    title: string;
    image: string;
    content: string;
    button_link: string | null;
    button_text: string | null;
}

interface NewsUpdate {
    id: number;
    title: string;
    content: string;
    year: string;
    image: string | null;
    created_at: string;
}

interface Props {
    slides: HomePageImage[];
    latestNews: NewsUpdate[];
}

export default function Home({ slides = [], latestNews = [] }: Props) {
    const heroSlide = (slides.length > 0 ? slides : fallbackSlides)[0];
    const isExternalCtaLink = heroSlide.button_link ? /^https?:\/\//i.test(heroSlide.button_link) : false;

    return (
        <FrontLayout title="Home">
            {/* Hero */}
            <FrontHero
                eyebrow="Welcome"
                title={heroSlide.title}
                subtitle={heroSlide.content}
            >
                {heroSlide.button_link && !isExternalCtaLink && (
                    <Link
                        href={heroSlide.button_link}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                    >
                        {heroSlide.button_text || 'Learn More'}
                        <ArrowRight size={16} />
                    </Link>
                )}
                {heroSlide.button_link && isExternalCtaLink && (
                    <a
                        href={heroSlide.button_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                    >
                        {heroSlide.button_text || 'Learn More'}
                        <ArrowRight size={16} />
                    </a>
                )}
            </FrontHero>

            {/* Stats Bar */}
            <section className="bg-brand-teal">
                <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/20 md:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="px-4 py-6 text-center md:py-8">
                            <div className="text-2xl font-extrabold text-white md:text-3xl">{stat.value}</div>
                            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/70">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="bg-brand-surface py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-foreground">Our Purpose</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                    </div>
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="rounded-xl border-l-4 border-brand-teal bg-card p-8 shadow-md">
                            <div className="mb-3 inline-block rounded-md bg-brand-teal px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                                Vision
                            </div>
                            <p className="text-foreground leading-relaxed">
                                A premier cooperative that empowers its members through
                                sustainable financial services, promoting economic independence and
                                community development.
                            </p>
                        </div>
                        <div className="rounded-xl border-l-4 border-brand-navy bg-card p-8 shadow-md">
                            <div className="mb-3 inline-block rounded-md bg-brand-navy px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                                Mission
                            </div>
                            <p className="text-foreground leading-relaxed">
                                To provide accessible, innovative, and responsive financial products
                                and services that promote the welfare and economic well-being of its
                                members, their families, and the community.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="bg-card py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-foreground">Core Values</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                    </div>
                    <div className="grid gap-6 sm:grid-cols-3">
                        {[
                            {
                                icon: Shield,
                                title: 'Integrity',
                                desc: 'We uphold the highest standards of honesty and transparency in all our dealings.',
                            },
                            {
                                icon: Users,
                                title: 'Service',
                                desc: 'We are committed to serving our members with dedication and excellence.',
                            },
                            {
                                icon: TrendingUp,
                                title: 'Growth',
                                desc: 'We foster financial growth and sustainability for members and the cooperative.',
                            },
                        ].map((value) => (
                            <div
                                key={value.title}
                                className="group rounded-xl bg-brand-border/30 p-8 text-center transition-all hover:bg-brand-navy hover:shadow-lg"
                            >
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal transition-colors group-hover:bg-card/10 group-hover:text-white">
                                    <value.icon size={28} />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-white">
                                    {value.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-white/80">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="bg-brand-surface py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-foreground">Our Products & Services</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                            Comprehensive financial and business solutions designed for the welfare of our members and the community.
                        </p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((svc) => (
                            <Link
                                key={svc.title}
                                href={svc.href}
                                className="group rounded-xl bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-navy/10 text-foreground transition-colors group-hover:bg-brand-navy group-hover:text-white">
                                    <svc.icon size={24} />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-foreground">{svc.title}</h3>
                                <p className="text-sm leading-relaxed text-muted-foreground">{svc.description}</p>
                                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-teal transition-colors group-hover:text-foreground">
                                    Learn More <ArrowRight size={14} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest News */}
            {latestNews.length > 0 && (
                <section className="bg-card py-16">
                    <div className="mx-auto max-w-7xl px-4">
                        <div className="mb-10 flex items-end justify-between">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">News & Updates</h2>
                                <div className="mt-2 h-1 w-16 rounded bg-brand-teal" />
                            </div>
                            <Link
                                href="/news"
                                className="hidden items-center gap-1 text-sm font-medium text-brand-teal transition hover:text-foreground sm:flex"
                            >
                                View All <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {latestNews.slice(0, 3).map((news) => (
                                <Link
                                    key={news.id}
                                    href={`/news/${news.id}`}
                                    className="group overflow-hidden rounded-xl bg-brand-border/20 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                                >
                                    {news.image ? (
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={`/storage/${news.image}`}
                                                alt={news.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex h-48 items-center justify-center bg-gradient-to-br from-brand-navy to-brand-blue">
                                            <span className="text-4xl font-bold text-white/20">NEWS</span>
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-brand-teal">
                                            {new Date(news.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                        <h3 className="mb-2 text-lg font-bold text-foreground">{news.title}</h3>
                                        <p className="line-clamp-2 text-sm text-muted-foreground">
                                            {news.content}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-6 text-center sm:hidden">
                            <Link
                                href="/news"
                                className="inline-flex items-center gap-1 text-sm font-medium text-brand-teal"
                            >
                                View All News <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="bg-gradient-to-r from-brand-navy to-brand-blue py-16">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-white">Ready to Join Our Cooperative?</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
                        Take your first step towards financial freedom. Become a member today and
                        enjoy our comprehensive suite of financial products and services.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/about/membership"
                            className="inline-flex items-center gap-2 rounded-lg bg-brand-teal px-8 py-3.5 font-semibold text-white shadow-lg transition hover:bg-brand-teal-dark"
                        >
                            Become a Member <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3.5 font-semibold text-white transition hover:bg-card/10"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </FrontLayout>
    );
}

