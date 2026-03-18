// cspell:ignore inertiajs socio
import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import Breadcrumb from '@/components/Breadcrumb';
import FrontHero from '@/components/FrontHero';
import { Eye, Target, Lightbulb, Star } from 'lucide-react';
import { strategies, goals, coreValues } from '../_data/about.data';

export default function About() {
    return (
        <FrontLayout title="About Us">
            {/* Hero Banner */}
            <FrontHero
                eyebrow="About Us"
                title="Sample Multi-Purpose Cooperative"
                subtitle="Where members invest their trust."
            />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'About Us' },
                ]}
            />

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
                            Where Members Invest Their Trust
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

