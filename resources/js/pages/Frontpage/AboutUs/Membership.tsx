import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import Breadcrumb from '@/components/Breadcrumb';
import FrontHero from '@/components/FrontHero';
import {
    CheckCircle,
    Users,
    BadgeCheck,
    ArrowRight,
} from 'lucide-react';
import { regularRequirements, associateRequirements, howToJoinSteps } from '../_data/membership.data';

export default function Membership() {
    return (
        <FrontLayout title="Membership">
            {/* Hero Banner */}
            <FrontHero
                eyebrow="Membership"
                title="Membership"
                subtitle="Membership with clear benefits and transparent policies."
            />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'About Us', href: '/about' },
                    { label: 'Membership' },
                ]}
            />

            {/* Membership Types */}
            <section className="bg-card py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-foreground">Types of Membership</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Regular Member */}
                        <div className="relative overflow-hidden rounded-2xl border-2 border-brand-navy bg-card p-8 shadow-lg">
                            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-navy/5" />
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-white">
                                    <BadgeCheck size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground">Regular Member</h3>
                            </div>
                            <p className="mb-6 text-sm text-muted-foreground">
                                Open to all qualified permanent employees.
                            </p>
                            <ul className="space-y-3">
                                {regularRequirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                                        <CheckCircle size={16} className="mt-0.5 shrink-0 text-brand-teal" />
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Associate Member */}
                        <div className="relative overflow-hidden rounded-2xl border-2 border-brand-blue bg-card p-8 shadow-lg">
                            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-blue/5" />
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white">
                                    <Users size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-brand-blue">Associate Member</h3>
                            </div>
                            <p className="mb-6 text-sm text-muted-foreground">
                                Open to any gainfully employed individual who does not qualify as a regular member.
                            </p>
                            <ul className="space-y-3">
                                {associateRequirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                                        <CheckCircle size={16} className="mt-0.5 shrink-0 text-brand-blue" />
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Join */}
            <section className="bg-brand-surface py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-foreground">How to Become a Member</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-4">
                        {howToJoinSteps.map((item) => (
                            <div key={item.step} className="relative rounded-xl bg-card p-6 shadow-md">
                                <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">
                                    {item.step}
                                </div>
                                <div className="mb-4 mt-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-navy/10 text-foreground">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
                                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-brand-navy to-brand-blue py-14">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-white">Ready to Start Your Journey?</h2>
                    <p className="mx-auto mb-6 max-w-xl text-white/80">
                        Download the membership application form and visit our office to begin the process.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/downloads"
                            className="inline-flex items-center gap-2 rounded-lg bg-brand-teal px-7 py-3 font-semibold text-white transition hover:bg-brand-teal-dark"
                        >
                            Download Forms <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-card/10"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </FrontLayout>
    );
}

