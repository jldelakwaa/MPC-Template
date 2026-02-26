import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import {
    CheckCircle,
    Users,
    GraduationCap,
    FileText,
    ArrowRight,
    BadgeCheck,
} from 'lucide-react';

export default function Membership() {
    return (
        <FrontLayout title="Membership">
            {/* Hero Banner */}
            <section className="bg-gradient-to-br from-[#1B3A6B] via-[#4A7AAC]/50 to-[#2E6B6B]/50 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-[#F0F4F8]">Membership</h1>
                    <p className="mt-3 text-lg text-[#F0F4F8]/70">
                        Join our cooperative and take your first step toward financial freedom
                    </p>
                    <div className="mx-auto mt-3 h-1 w-16 rounded bg-[#2E6B6B]" />
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="bg-[#D6D8DC]/30">
                <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-[#2C2C2C]/60">
                    <Link href="/" className="hover:text-[#1B3A6B]">Home</Link>
                    <span>/</span>
                    <Link href="#" className="hover:text-[#1B3A6B]">About Us</Link>
                    <span>/</span>
                    <span className="font-medium text-[#1B3A6B]">Membership</span>
                </div>
            </div>

            {/* Membership Types */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-[#1B3A6B]">Types of Membership</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-[#2E6B6B]" />
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Regular Member */}
                        <div className="relative overflow-hidden rounded-2xl border-2 border-[#1B3A6B] bg-white p-8 shadow-lg">
                            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#1B3A6B]/5" />
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1B3A6B] text-white">
                                    <BadgeCheck size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1B3A6B]">Regular Member</h3>
                            </div>
                            <p className="mb-6 text-sm text-[#2C2C2C]/70">
                                Open to all qualified permanent employees.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Permanent employee of the organization',
                                    'Completed the Pre-Membership Education Seminar (PMES)',
                                    'Good moral standing in the community',
                                    'Subscribed the required shares payable within 10 years',
                                    'Paid minimum required shares within 1 year',
                                    'Permanent employees of the cooperative',
                                    'Separated employees who are regular members',
                                ].map((req, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-[#2C2C2C]">
                                        <CheckCircle size={16} className="mt-0.5 shrink-0 text-[#2E6B6B]" />
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Associate Member */}
                        <div className="relative overflow-hidden rounded-2xl border-2 border-[#4A7AAC] bg-white p-8 shadow-lg">
                            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#4A7AAC]/5" />
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4A7AAC] text-white">
                                    <Users size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#4A7AAC]">Associate Member</h3>
                            </div>
                            <p className="mb-6 text-sm text-[#2C2C2C]/70">
                                Open to any gainfully employed individual who does not qualify as a regular member.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Gainfully employed (does not qualify as regular member)',
                                    'Completed the Pre-Membership Education Seminar (PMES)',
                                    'Good moral standing in the community',
                                    'Subscribed the required shares payable within 10 years',
                                    'Paid the minimum required shares within 1 year',
                                ].map((req, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-[#2C2C2C]">
                                        <CheckCircle size={16} className="mt-0.5 shrink-0 text-[#4A7AAC]" />
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Join */}
            <section className="bg-[#f7f8fa] py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-[#1B3A6B]">How to Become a Member</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-[#2E6B6B]" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-4">
                        {[
                            {
                                step: '01',
                                icon: FileText,
                                title: 'Sign Up',
                                desc: 'Fill up the Membership Application and Subscription Agreement (MASA) Form and express your intention to join.',
                            },
                            {
                                step: '02',
                                icon: GraduationCap,
                                title: 'Attend PMES',
                                desc: 'Attend and complete the Pre-Membership Education Seminar scheduled by the Education & Training Committee.',
                            },
                            {
                                step: '03',
                                icon: FileText,
                                title: 'Submit Application',
                                desc: 'Complete the registration form, pay at least 1 share (₱1,000) and membership fee (₱300).',
                            },
                            {
                                step: '04',
                                icon: BadgeCheck,
                                title: 'Get Approved',
                                desc: 'The Education Committee Chairperson and Board Chairperson will provisionally approve your application.',
                            },
                        ].map((item) => (
                            <div key={item.step} className="relative rounded-xl bg-white p-6 shadow-md">
                                <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#2E6B6B] text-sm font-bold text-white">
                                    {item.step}
                                </div>
                                <div className="mb-4 mt-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#1B3A6B]/10 text-[#1B3A6B]">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-[#1B3A6B]">{item.title}</h3>
                                <p className="text-sm leading-relaxed text-[#2C2C2C]/70">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-[#1B3A6B] to-[#4A7AAC] py-14">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-white">Ready to Start Your Journey?</h2>
                    <p className="mx-auto mb-6 max-w-xl text-white/80">
                        Download the membership application form and visit our office to begin the process.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/downloads"
                            className="inline-flex items-center gap-2 rounded-lg bg-[#2E6B6B] px-7 py-3 font-semibold text-white transition hover:bg-[#245858]"
                        >
                            Download Forms <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </FrontLayout>
    );
}
