import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import Breadcrumb from '@/components/Breadcrumb';
import FrontHero from '@/components/FrontHero';
import { Calendar, Building2 } from 'lucide-react';
import { milestones } from '../_data/history.data';

export default function History() {
    return (
        <FrontLayout title="Our History">
            {/* Hero Banner */}
            <FrontHero
                eyebrow="About Us"
                title="Our History"
                subtitle="A brief timeline of our cooperative’s growth."
            />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'About Us', href: '/about' },
                    { label: 'History' },
                ]}
            />

            {/* Intro */}
            <section className="bg-card py-12">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <Building2 className="mx-auto mb-4 text-foreground" size={40} />
                    <p className="text-lg leading-relaxed text-foreground">
                        Our cooperative was organized in <strong>1999</strong> by founding community
                        leaders dedicated to financial welfare, inclusive growth, and long-term
                        member success.
                    </p>
                </div>
            </section>

            {/* Timeline */}
            <section className="bg-brand-surface py-16">
                <div className="mx-auto max-w-4xl px-4">
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-brand-navy/20 md:left-1/2 md:block" />

                        <div className="space-y-8">
                            {milestones.map((m, i) => (
                                <div
                                    key={m.year}
                                    className={`relative flex flex-col md:flex-row ${
                                        i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    } items-start gap-6 md:gap-0`}
                                >
                                    {/* Content */}
                                    <div
                                        className={`w-full md:w-1/2 ${
                                            i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                                        }`}
                                    >
                                        <div className="rounded-xl bg-card p-6 shadow-md transition-all hover:shadow-lg">
                                            <div className="mb-2 flex items-center gap-2 md:justify-end">
                                                <Calendar size={16} className="text-brand-teal" />
                                                <span className="text-sm font-bold text-brand-teal">
                                                    {m.year}
                                                </span>
                                            </div>
                                            <h3 className="mb-2 text-xl font-bold text-foreground">
                                                {m.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                {m.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Dot */}
                                    <div className="absolute left-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-brand-navy bg-card md:left-1/2 md:block" style={{ top: '28px' }} />

                                    {/* Spacer */}
                                    <div className="hidden w-1/2 md:block" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </FrontLayout>
    );
}

