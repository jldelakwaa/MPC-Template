import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import Breadcrumb from '@/components/Breadcrumb';
import FrontHero from '@/components/FrontHero';
import { ArrowRight } from 'lucide-react';
import { services } from '../_data/services.data';

export default function ServicesIndex() {
    return (
        <FrontLayout title="Products & Services">
            {/* Hero Banner */}
            <FrontHero
                eyebrow="Products & Services"
                title="Products & Services"
                subtitle="Transparent, member-focused financial services."
            />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products & Services' },
                ]}
            />

            {/* Services Grid */}
            <section className="bg-card py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-foreground">Our Offerings</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                            BOPE Cooperative provides a wide range of financial and non-financial products and
                            services to serve the needs of our members and community.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <Link
                                key={service.title}
                                href={service.href}
                                className="group flex flex-col rounded-2xl border border-border/60 bg-card p-8 shadow-md transition-all hover:shadow-lg hover:border-brand-navy/30"
                            >
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy/10 text-foreground transition-colors group-hover:bg-brand-navy group-hover:text-white">
                                    <service.icon size={28} />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-foreground">{service.title}</h3>
                                <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                                    {service.description}
                                </p>
                                <span className="flex items-center gap-1 text-sm font-semibold text-brand-teal group-hover:gap-2 transition-all">
                                    Learn more <ArrowRight size={16} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </FrontLayout>
    );
}

