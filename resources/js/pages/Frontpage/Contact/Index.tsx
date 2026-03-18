import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import FrontHero from '@/components/FrontHero';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    Facebook,
    MessageSquare,
    CheckCircle,
} from 'lucide-react';
import { FormEvent } from 'react';
import { type SharedData } from '@/types';
import { contactInfo } from '../_data/contact.data';

export default function Contact() {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '',
    });

    const [selectedMap, setSelectedMap] = useState<
        { name: string; address: string } | null
    >(
        contactInfo.mapAddresses && contactInfo.mapAddresses.length > 0
            ? (contactInfo.mapAddresses[0] as { name: string; address: string })
            : null
    );

    const { props } = usePage<SharedData>();
    const successMessage = props.flash?.success;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    return (
        <FrontLayout title="Contact Us">
            {/* Hero Banner */}
            <FrontHero
                eyebrow="Contact"
                title="Contact Us"
                subtitle="We respond during office hours and will get back to you shortly."
            />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Contact Us' },
                ]}
            />

            {/* Contact Info & Form */}
            <section className="relative overflow-hidden bg-gradient-to-b from-brand-surface via-card to-card py-20">
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <div className="absolute -left-20 top-8 h-64 w-64 rounded-full bg-brand-blue/15 blur-3xl" />
                    <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-brand-navy/15 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4">
                    <div className="mb-12 max-w-3xl">
                        <p className="mb-3 inline-flex rounded-full border border-brand-blue/20 bg-brand-blue/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
                            Reach Us Anytime
                        </p>
                        <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
                            Let&apos;s start a conversation.
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                            Tell us what you need and our team will respond as soon as possible during office hours.
                            Use the form for comments, concerns, or partnership inquiries.
                        </p>
                    </div>

                    <div className="grid items-stretch gap-8 lg:grid-cols-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-5">
                            <div className="h-full rounded-3xl border border-brand-navy/10 bg-card p-8 text-foreground shadow-xl shadow-brand-navy/5">
                                <h3 className="text-2xl font-semibold">Contact Details</h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Prefer direct channels? Here are all our official contact points.
                                </p>

                                <div className="mt-8 space-y-6">
                                    <div className="flex items-start gap-4 rounded-2xl border border-brand-navy/10 bg-brand-surface p-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy/10 text-brand-navy">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Office Locations</h4>
                                            {contactInfo.mapAddresses && contactInfo.mapAddresses.length > 0 ? (
                                                <ul className="mt-2 space-y-2">
                                                    {contactInfo.mapAddresses.map((addrObj, idx) => (
                                                        <li key={idx}>
                                                            <p className="text-sm font-medium text-foreground">{addrObj.name}</p>
                                                            <p className="text-xs text-muted-foreground">{addrObj.address}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    {contactInfo.address.split('\n').map((line, i) => (
                                                        <span key={i}>{line}{i < contactInfo.address.split('\n').length - 1 && <br />}</span>
                                                    ))}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 rounded-2xl border border-brand-navy/10 bg-brand-surface p-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy/10 text-brand-navy">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Phone Numbers</h4>
                                            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Telephone</p>
                                            {contactInfo.telephone.map((t, i) => (
                                                <p key={i} className="text-sm text-muted-foreground">
                                                    <span className="font-medium text-foreground">{t.label}:</span> {t.number}
                                                </p>
                                            ))}
                                            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Mobile</p>
                                            {contactInfo.mobile.map((m, i) => (
                                                <p key={i} className="text-sm text-muted-foreground">
                                                    <span className="font-medium text-foreground">{m.label}:</span> {m.number}
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="rounded-2xl border border-brand-navy/10 bg-brand-surface p-4">
                                            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-navy/10 text-brand-navy">
                                                <Mail size={18} />
                                            </div>
                                            <h4 className="font-semibold">Email</h4>
                                            <p className="mt-1 break-all text-sm text-muted-foreground">{contactInfo.email}</p>
                                        </div>
                                        <div className="rounded-2xl border border-brand-navy/10 bg-brand-surface p-4">
                                            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-navy/10 text-brand-navy">
                                                <Clock size={18} />
                                            </div>
                                            <h4 className="font-semibold">Office Hours</h4>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {contactInfo.officeHours.split('\n').map((line, i) => (
                                                    <span key={i}>{line}{i < contactInfo.officeHours.split('\n').length - 1 && <br />}</span>
                                                ))}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href={contactInfo.facebookUrl}
                                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-navy-dark"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Facebook size={16} /> Visit our Facebook page
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-7">
                            <div className="h-full rounded-3xl border border-white/20 bg-brand-navy/90 p-6 text-white shadow-2xl shadow-brand-navy/25 md:p-8">
                                <h3 className="flex items-center gap-2 text-2xl font-bold text-white">
                                    <MessageSquare size={22} /> Comments & Suggestions
                                </h3>
                                <p className="mt-2 text-sm text-white/75">
                                    Fill in the form below and we&apos;ll get back to you shortly.
                                </p>

                                {successMessage && (
                                    <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-300/30 bg-emerald-500/15 p-4 text-sm text-emerald-100">
                                        <CheckCircle size={18} className="mt-0.5 shrink-0 text-emerald-300" />
                                        <span>{successMessage}</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
                                    <input
                                        type="text"
                                        name="website"
                                        value={data.website}
                                        onChange={(e) => setData('website', e.target.value)}
                                        className="hidden"
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-1.5 block text-sm font-semibold text-white">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/60 focus:border-white focus:ring-2 focus:ring-white/25"
                                                placeholder="Your name"
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-xs text-destructive">{errors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-sm font-semibold text-white">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/60 focus:border-white focus:ring-2 focus:ring-white/25"
                                                placeholder="your@email.com"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-semibold text-white">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/60 focus:border-white focus:ring-2 focus:ring-white/25"
                                            placeholder="What is this about?"
                                        />
                                        {errors.subject && (
                                            <p className="mt-1 text-xs text-destructive">{errors.subject}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-semibold text-white">
                                            Message
                                        </label>
                                        <textarea
                                            rows={10}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="w-full resize-none rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/60 focus:border-white focus:ring-2 focus:ring-white/25"
                                            placeholder="Your message..."
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-xs text-destructive">{errors.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-brand-navy shadow-lg shadow-black/20 transition hover:bg-white/90 disabled:opacity-50 sm:mx-auto sm:w-auto"
                                    >
                                        <Send size={16} />
                                        {processing ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            {contactInfo.mapAddresses && contactInfo.mapAddresses.length > 0 && (
                <section className="bg-brand-surface pb-14">
                    <div className="mx-auto max-w-7xl px-4">
                        <div className="mb-6 text-center">
                            <h3 className="text-2xl font-bold text-foreground">Find Us on the Map</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Select a location to preview the area and route planning context.
                            </p>
                        </div>

                        {/* Location Tabs */}
                        <div className="mb-5 flex flex-wrap justify-center gap-2">
                            {contactInfo.mapAddresses.map((addrObj, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setSelectedMap(addrObj as { name: string; address: string })}
                                    className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                                        selectedMap?.address === addrObj.address
                                            ? 'border-brand-navy bg-brand-navy text-white'
                                            : 'border-brand-navy/20 bg-card text-foreground hover:border-brand-navy hover:bg-brand-navy/5'
                                    }`}
                                >
                                    {addrObj.name}
                                </button>
                            ))}
                        </div>

                        {selectedMap && (
                            <div className="overflow-hidden rounded-3xl border border-brand-navy/10 shadow-xl shadow-brand-navy/10">
                                <iframe
                                    key={selectedMap.address}
                                    title="location map"
                                    className="w-full h-120 border-0"
                                    loading="lazy"
                                    allowFullScreen
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                                        selectedMap.name + ', ' + selectedMap.address
                                    )}&z=14&output=embed&iwloc=A`}
                                />
                            </div>
                        )}
                    </div>
                </section>
            )}
        </FrontLayout>
    );
}
