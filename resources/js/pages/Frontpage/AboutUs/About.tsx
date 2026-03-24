// cspell:ignore inertiajs socio BOPEMPC
import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import Breadcrumb from '@/components/Breadcrumb';
import FrontHero from '@/components/FrontHero';
import { Eye, Target, Lightbulb, Star, ArrowRight, Image, ScrollText, Users } from 'lucide-react';
import { strategies, goals, coreValues } from '../_data/about.data';

const aboutDropdownCards = [
    {
        title: 'Gallery',
        href: '/about/gallery',
        description: 'Browse cooperative events, milestones, and community highlights.',
        icon: Image,
    },
    {
        title: 'History',
        href: '/about/history',
        description: 'See how the cooperative started and evolved through the years.',
        icon: ScrollText,
    },
    {
        title: 'Membership',
        href: '/about/membership',
        description: 'Review membership types, requirements, and how to join.',
        icon: Users,
    },
];

export default function About() {
    return (
        <FrontLayout title="About Us">
            {/* Hero Banner */}
            <FrontHero
                eyebrow="About Us"
                title="Bohol Provincial Employees Multi-Purpose Cooperative"
                subtitle="Where members invest their trust."
            />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'About Us' },
                ]}
            />

            {/* About Us Navigation Cards */}
            <section className="bg-card py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-foreground">About Us</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                            Quick access to all available About Us sections from the dropdown menu.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {aboutDropdownCards.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="group flex flex-col rounded-2xl border border-border/60 bg-card p-8 shadow-md transition-all hover:border-brand-navy/30 hover:shadow-lg"
                            >
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy/10 text-foreground transition-colors group-hover:bg-brand-navy group-hover:text-white">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-foreground">{item.title}</h3>
                                <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                                    {item.description}
                                </p>
                                <span className="flex items-center gap-1 text-sm font-semibold text-brand-teal transition-all group-hover:gap-2">
                                    Learn more <ArrowRight size={16} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="bg-card py-16">
                <div className="mx-auto max-w-5xl px-4">
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Vision */}
                        <div className="flex gap-5 rounded-2xl border border-brand-navy/10 bg-brand-surface p-8 shadow-sm">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-white">
                                <Eye size={28} />
                            </div>
                            <div>
                                <h2 className="mb-3 text-2xl font-extrabold uppercase tracking-wide text-foreground">
                                    Vision
                                </h2>
                                <p className="text-lg leading-relaxed text-foreground">
                                    A Billionaire Cooperative in the year 2040
                                </p>
                            </div>
                        </div>

                        {/* Mission */}
                        <div className="flex gap-5 rounded-2xl border border-brand-teal/10 bg-brand-surface p-8 shadow-sm">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-teal text-white">
                                <Target size={28} />
                            </div>
                            <div>
                                <h2 className="mb-3 text-2xl font-extrabold uppercase tracking-wide text-brand-teal">
                                    Mission
                                </h2>
                                <p className="leading-relaxed text-foreground">
                                    We are committed to advance the socio economic and moral well-being
                                    of the members through provision of adequate benefits and quality
                                    services and sustain its competitive edge with <strong>fairness, honesty,
                                    accountability and transparency.</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategies */}
            <section className="bg-brand-surface py-16">
                <div className="mx-auto max-w-5xl px-4">
                    <div className="mb-10 text-center">
                        <div className="mb-3 flex items-center justify-center gap-2">
                            <Lightbulb className="text-brand-blue" size={28} />
                            <h2 className="text-3xl font-extrabold uppercase tracking-wide text-foreground">
                                Our Strategies
                            </h2>
                        </div>
                        <div className="mx-auto h-1 w-16 rounded bg-brand-teal" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {strategies.map((s) => (
                            <div
                                key={s.key}
                                className="flex items-start gap-4 rounded-xl bg-card p-5 shadow-sm"
                            >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-sm font-bold text-white">
                                    {s.key}.
                                </span>
                                <p className="leading-relaxed text-foreground">{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Goals & Core Values */}
            <section className="bg-card py-16">
                <div className="mx-auto max-w-5xl px-4">
                    <div className="mb-10 text-center">
                        <div className="mb-3 flex items-center justify-center gap-2">
                            <Star className="text-brand-blue" size={28} />
                            <h2 className="text-3xl font-extrabold uppercase tracking-wide text-foreground">
                                Our Goals Powered by Core Values
                            </h2>
                        </div>
                        <div className="mx-auto h-1 w-16 rounded bg-brand-teal" />
                        <p className="mt-4 text-lg font-semibold text-brand-teal">
                            BOPEMPC: Where Members Invest Their Trust
                        </p>
                    </div>

                    <div className="grid gap-10 lg:grid-cols-2">
                        {/* Goals */}
                        <div>
                            <h3 className="mb-5 text-lg font-bold uppercase tracking-wider text-foreground">
                                Our Goals
                            </h3>
                            <ul className="space-y-4">
                                {goals.map((goal, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white">
                                            {i + 1}
                                        </span>
                                        <p className="leading-relaxed text-foreground">{goal}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Core Values */}
                        <div>
                            <h3 className="mb-5 text-lg font-bold uppercase tracking-wider text-foreground">
                                Core Values
                            </h3>
                            <div className="space-y-4">
                                {coreValues.map((cv) => (
                                    <div
                                        key={cv.title}
                                        className="rounded-xl border border-brand-navy/10 bg-brand-surface p-5"
                                    >
                                        <h4 className="font-bold text-foreground">{cv.title}</h4>
                                        {cv.items.length > 0 && (
                                            <ul className="mt-2 space-y-1">
                                                {cv.items.map((item) => (
                                                    <li
                                                        key={item}
                                                        className="flex items-center gap-2 text-sm text-muted-foreground"
                                                    >
                                                        <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </FrontLayout>
    );
}

