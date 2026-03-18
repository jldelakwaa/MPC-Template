import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import Breadcrumb from '@/components/Breadcrumb';
import FrontHero from '@/components/FrontHero';
import { MapPin, ArrowRight, Facebook, Mail, CheckCircle } from 'lucide-react';

export interface ServiceImage {
    src: string;
    alt: string;
}

export interface ServiceLocationItem {
    name: string;
    description: string;
}

export interface ServiceCertification {
    src: string;
    alt: string;
}

export interface ServiceDetailPageData {
    hero: {
        title: string;
        subtitle: string;
    };
    content: {
        /** Small pill label shown above the heading */
        badge?: string;
        heading: string;
        description?: string;
        /** Single-address card with a map pin */
        location?: string;
        /** Facebook page link card */
        facebook?: { url: string; display: string };
        /** Optional email contact */
        email?: string;
        /** Multiple named location cards (e.g. branches) */
        locations?: ServiceLocationItem[];
        /** Checkmark feature list */
        features?: string[];
        image: ServiceImage;
        /** 'left' = image first column (default), 'right' = text first column */
        imagePosition?: 'left' | 'right';
    };
    /** Optional "Certified by" logos section */
    certifications?: ServiceCertification[];
    cta: {
        heading: string;
        description: string;
        link: string;
        label: string;
    };
}

export default function ServiceDetailPage({ data }: { data: ServiceDetailPageData }) {
    const { hero, content, certifications, cta } = data;
    const imageLeft = content.imagePosition !== 'right';

    const textColumn = (
        <div>
            {content.badge && (
                <div className="mb-4 inline-block rounded-md bg-brand-teal px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                    {content.badge}
                </div>
            )}
            <h2 className={`${content.badge ? 'mb-6' : 'mb-2'} text-3xl font-bold text-foreground`}>
                {content.heading}
            </h2>
            {content.description && (
                <p className="mb-4 leading-relaxed text-muted-foreground">{content.description}</p>
            )}
            {content.locations && (
                <div className="space-y-4">
                    {content.locations.map((loc) => (
                        <div key={loc.name} className="rounded-xl bg-brand-border/20 p-5">
                            <div className="mb-2 flex items-center gap-2">
                                <MapPin size={18} className="text-brand-teal" />
                                <h4 className="font-semibold text-foreground">{loc.name}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">{loc.description}</p>
                        </div>
                    ))}
                </div>
            )}
            {content.location && (
                <div className="flex items-start gap-3 rounded-xl bg-brand-border/20 p-4">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-brand-teal" />
                    <p className="text-sm text-foreground/80">{content.location}</p>
                </div>
            )}
            {content.facebook && (
                <div className="mt-4 flex items-start gap-3 rounded-xl bg-brand-border/20 p-4">
                    <Facebook size={18} className="mt-0.5 shrink-0 text-brand-teal" />
                    <a
                        href={content.facebook.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground/80 hover:underline"
                    >
                        {content.facebook.display}
                    </a>
                </div>
            )}

            {content.email && (
                <div className="mt-4 flex items-start gap-3 rounded-xl bg-brand-border/20 p-4">
                    <Mail size={18} className="mt-0.5 shrink-0 text-brand-teal" />
                    <a
                        href={`mailto:${content.email}`}
                        className="text-sm text-foreground/80 hover:underline"
                    >
                        {content.email}
                    </a>
                </div>
            )}
            {content.features && (
                <ul className="mt-6 space-y-2">
                    {content.features.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                            <CheckCircle size={14} className="text-brand-teal" />
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    const imageColumn = imageLeft ? (
        <div className="flex max-h-96 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal to-brand-blue">
            <img src={content.image.src} alt={content.image.alt} className="h-auto max-w-full object-cover" />
        </div>
    ) : (
        <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy to-brand-blue">
            <img src={content.image.src} alt={content.image.alt} className="h-full w-full object-cover" />
        </div>
    );

    return (
        <FrontLayout title={hero.title}>
            {/* Hero */}
            <FrontHero
                eyebrow="Service"
                title={hero.title}
                subtitle={hero.subtitle}
            />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products & Services', href: '/services' },
                    { label: hero.title },
                ]}
            />

            {/* Content */}
            <section className="bg-card py-16">
                <div className="mx-auto max-w-7xl px-4">
                    {/* use a 2:1 column split on medium+ screens so the image doesn't occupy half the space */}
                <div className="grid items-center gap-12 md:grid-cols-[2fr_1fr]">
                        {imageLeft ? imageColumn : textColumn}
                        {imageLeft ? textColumn : imageColumn}
                    </div>
                </div>
            </section>

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <section className="bg-gray-50 py-12">
                    <div className="mx-auto max-w-7xl px-4 text-center">
                        <p className="mb-4 text-sm font-semibold text-foreground">Certified by</p>
                        <div className="flex items-center justify-center gap-8">
                            {certifications.map((cert) => (
                                <img key={cert.src} src={cert.src} alt={cert.alt} className="h-12 w-auto" />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="bg-gradient-to-r from-brand-navy to-brand-blue py-14">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-white">{cta.heading}</h2>
                    <p className="mx-auto mb-6 max-w-xl text-white/80">{cta.description}</p>
                    <Link
                        href={cta.link}
                        className="inline-flex items-center gap-2 rounded-lg bg-brand-teal px-7 py-3 font-semibold text-white transition hover:bg-brand-teal-dark"
                    >
                        {cta.label} <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </FrontLayout>
    );
}

