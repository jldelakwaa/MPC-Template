import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import {
    ChevronRight,
    ChevronLeft,
    Shield,
    Users,
    TrendingUp,
    Building2,
    Droplets,
    Hotel,
    HandCoins,
    PiggyBank,
    ArrowRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';

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
    const [currentSlide, setCurrentSlide] = useState(0);

    const defaultSlides = slides.length > 0 ? slides : [
        {
            id: 1,
            title: 'Welcome to Our Cooperative',
            image: '',
            content: 'Empowering members towards economic success and financial freedom.',
            button_link: '/about/history',
            button_text: 'Learn More',
        },
        {
            id: 2,
            title: 'Flexible Loan Products',
            image: '',
            content: 'Access affordable loans tailored to your needs — from regular to emergency, gadget to livelihood loans.',
            button_link: '/services/loans',
            button_text: 'View Loans',
        },
        {
            id: 3,
            title: 'Grow Your Savings',
            image: '',
            content: 'High-yield interest rates on regular and time deposits. Start building your future with us today.',
            button_link: '/services/savings',
            button_text: 'Start Saving',
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % defaultSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [defaultSlides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % defaultSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + defaultSlides.length) % defaultSlides.length);

    const services = [
        {
            icon: HandCoins,
            title: 'Credit & Lending',
            description: 'Flexible loan products for every need — regular, emergency, livelihood, and more.',
            href: '/services/loans',
        },
        {
            icon: PiggyBank,
            title: 'Savings & Deposits',
            description: 'Competitive interest rates on regular savings, time deposits, and share capital.',
            href: '/services/savings',
        },
        {
            icon: Hotel,
            title: 'Hospitality',
            description: 'A Safe, Affordable, Friendly and Relaxing Inn for members and guests.',
            href: '/services/safari',
        },
        {
            icon: Droplets,
            title: 'Water Station',
            description: 'Quality purified drinking water refilling station for members and the public.',
            href: '/services/aqua-bope',
        },
        {
            icon: Building2,
            title: 'Commercial Spaces',
            description: 'Rentable office and commercial spaces for businesses.',
            href: '/services/commercial-building',
        },
    ];

    const stats = [
        { label: 'Years of Service', value: '25+' },
        { label: 'Active Members', value: '3,000+' },
        { label: 'Loan Products', value: '10+' },
        { label: 'Business Ventures', value: '5' },
    ];

    return (
        <FrontLayout title="Home">
            {/* Hero Slider */}
            <section className="relative h-[480px] overflow-hidden bg-[#1B3A6B] md:h-[560px]">
                {defaultSlides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                            index === currentSlide ? 'z-10 opacity-100' : 'z-0 opacity-0'
                        }`}
                    >
                        {slide.image ? (
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(/storage/${slide.image})` }}
                            >
                                <div className="absolute inset-0 bg-[#1B3A6B]/70" />
                            </div>
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A6B] via-[#4A7AAC]/40 to-[#2E6B6B]/60" />
                        )}
                        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4">
                            <div className="max-w-2xl">
                                <h2 className="mb-4 text-3xl font-extrabold leading-tight text-[#F0F4F8] md:text-5xl">
                                    {slide.title}
                                </h2>
                                <p className="mb-8 text-base leading-relaxed text-[#F0F4F8]/80 md:text-lg">
                                    {slide.content}
                                </p>
                                {slide.button_link && (
                                    <Link
                                        href={slide.button_link}
                                        className="inline-flex items-center gap-2 rounded-lg bg-[#2E6B6B] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#245858] hover:shadow-xl"
                                    >
                                        {slide.button_text || 'Learn More'}
                                        <ArrowRight size={16} />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {/* Slide Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                    <ChevronRight size={24} />
                </button>
                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                    {defaultSlides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-2.5 rounded-full transition-all ${
                                idx === currentSlide ? 'w-8 bg-[#2E6B6B]' : 'w-2.5 bg-white/40'
                            }`}
                        />
                    ))}
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-[#2E6B6B]">
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
            <section className="bg-[#f7f8fa] py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-[#1B3A6B]">Our Purpose</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-[#2E6B6B]" />
                    </div>
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="rounded-xl border-l-4 border-[#2E6B6B] bg-white p-8 shadow-md">
                            <div className="mb-3 inline-block rounded-md bg-[#2E6B6B] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                                Vision
                            </div>
                            <p className="text-[#2C2C2C] leading-relaxed">
                                A premier cooperative that empowers its members through
                                sustainable financial services, promoting economic independence and
                                community development.
                            </p>
                        </div>
                        <div className="rounded-xl border-l-4 border-[#1B3A6B] bg-white p-8 shadow-md">
                            <div className="mb-3 inline-block rounded-md bg-[#1B3A6B] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                                Mission
                            </div>
                            <p className="text-[#2C2C2C] leading-relaxed">
                                To provide accessible, innovative, and responsive financial products
                                and services that promote the welfare and economic well-being of its
                                members, their families, and the community.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-[#1B3A6B]">Core Values</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-[#2E6B6B]" />
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
                                className="group rounded-xl bg-[#D6D8DC]/30 p-8 text-center transition-all hover:bg-[#1B3A6B] hover:shadow-lg"
                            >
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#2E6B6B]/10 text-[#2E6B6B] transition-colors group-hover:bg-white/10 group-hover:text-white">
                                    <value.icon size={28} />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-[#1B3A6B] group-hover:text-white">
                                    {value.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-[#2C2C2C]/70 group-hover:text-white/80">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="bg-[#f7f8fa] py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-[#1B3A6B]">Our Products & Services</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-[#2E6B6B]" />
                        <p className="mx-auto mt-4 max-w-2xl text-[#2C2C2C]/70">
                            Comprehensive financial and business solutions designed for the welfare of our members and the community.
                        </p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((svc) => (
                            <Link
                                key={svc.title}
                                href={svc.href}
                                className="group rounded-xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#1B3A6B]/10 text-[#1B3A6B] transition-colors group-hover:bg-[#1B3A6B] group-hover:text-white">
                                    <svc.icon size={24} />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-[#1B3A6B]">{svc.title}</h3>
                                <p className="text-sm leading-relaxed text-[#2C2C2C]/70">{svc.description}</p>
                                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#2E6B6B] transition-colors group-hover:text-[#1B3A6B]">
                                    Learn More <ArrowRight size={14} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest News */}
            {latestNews.length > 0 && (
                <section className="bg-white py-16">
                    <div className="mx-auto max-w-7xl px-4">
                        <div className="mb-10 flex items-end justify-between">
                            <div>
                                <h2 className="text-3xl font-bold text-[#1B3A6B]">News & Updates</h2>
                                <div className="mt-2 h-1 w-16 rounded bg-[#2E6B6B]" />
                            </div>
                            <Link
                                href="/news"
                                className="hidden items-center gap-1 text-sm font-medium text-[#2E6B6B] transition hover:text-[#1B3A6B] sm:flex"
                            >
                                View All <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {latestNews.slice(0, 3).map((news) => (
                                <Link
                                    key={news.id}
                                    href={`/news/${news.id}`}
                                    className="group overflow-hidden rounded-xl bg-[#D6D8DC]/20 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
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
                                        <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[#1B3A6B] to-[#4A7AAC]">
                                            <span className="text-4xl font-bold text-white/20">NEWS</span>
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#2E6B6B]">
                                            {new Date(news.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                        <h3 className="mb-2 text-lg font-bold text-[#1B3A6B]">{news.title}</h3>
                                        <p className="line-clamp-2 text-sm text-[#2C2C2C]/70">
                                            {news.content}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-6 text-center sm:hidden">
                            <Link
                                href="/news"
                                className="inline-flex items-center gap-1 text-sm font-medium text-[#2E6B6B]"
                            >
                                View All News <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="bg-gradient-to-r from-[#1B3A6B] to-[#4A7AAC] py-16">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-white">Ready to Join Our Cooperative?</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
                        Take your first step towards financial freedom. Become a member today and
                        enjoy our comprehensive suite of financial products and services.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/about/membership"
                            className="inline-flex items-center gap-2 rounded-lg bg-[#2E6B6B] px-8 py-3.5 font-semibold text-white shadow-lg transition hover:bg-[#245858]"
                        >
                            Become a Member <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3.5 font-semibold text-white transition hover:bg-white/10"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </FrontLayout>
    );
}
