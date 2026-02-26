import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link, useForm } from '@inertiajs/react';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    Facebook,
    MessageSquare,
} from 'lucide-react';
import { FormEvent } from 'react';

export default function Contact() {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    return (
        <FrontLayout title="Contact Us">
            {/* Hero Banner */}
            <section className="bg-gradient-to-br from-[#1B3A6B] via-[#4A7AAC]/50 to-[#2E6B6B]/50 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-[#F0F4F8]">Contact Us</h1>
                    <p className="mt-3 text-lg text-[#F0F4F8]/70">
                        We'd love to hear from you
                    </p>
                    <div className="mx-auto mt-3 h-1 w-16 rounded bg-[#2E6B6B]" />
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="bg-[#D6D8DC]/30">
                <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-[#2C2C2C]/60">
                    <Link href="/" className="hover:text-[#1B3A6B]">Home</Link>
                    <span>/</span>
                    <span className="font-medium text-[#1B3A6B]">Contact Us</span>
                </div>
            </div>

            {/* Contact Info & Form */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid gap-12 lg:grid-cols-5">
                        {/* Contact Info */}
                        <div className="lg:col-span-2">
                            <h2 className="mb-6 text-2xl font-bold text-[#1B3A6B]">Get In Touch</h2>
                            <p className="mb-8 leading-relaxed text-[#2C2C2C]/70">
                                Have questions or suggestions? Reach out to us through any of the
                                channels below, or fill out the contact form.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1B3A6B]/10 text-[#1B3A6B]">
                                        <MapPin size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#1B3A6B]">Our Office</h4>
                                        <p className="mt-1 text-sm text-[#2C2C2C]/70">
                                            Cooperative Building,<br />
                                            Your Address Here
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1B3A6B]/10 text-[#1B3A6B]">
                                        <Phone size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#1B3A6B]">Phone</h4>
                                        <p className="mt-1 text-sm text-[#2C2C2C]/70">(000) 000-0000</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1B3A6B]/10 text-[#1B3A6B]">
                                        <Mail size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#1B3A6B]">Email</h4>
                                        <p className="mt-1 text-sm text-[#2C2C2C]/70">info@cooperative.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1B3A6B]/10 text-[#1B3A6B]">
                                        <Clock size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#1B3A6B]">Office Hours</h4>
                                        <p className="mt-1 text-sm text-[#2C2C2C]/70">
                                            Monday - Friday: 8:00 AM - 5:00 PM<br />
                                            Saturday & Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <h4 className="mb-3 font-semibold text-[#1B3A6B]">Follow Us</h4>
                                <a
                                    href="#"
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1B3A6B] text-white transition hover:bg-[#4A7AAC]"
                                >
                                    <Facebook size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-3">
                            <div className="rounded-2xl bg-[#D6D8DC]/20 p-8">
                                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-[#1B3A6B]">
                                    <MessageSquare size={22} /> Comments & Suggestions
                                </h3>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-[#1B3A6B]">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full rounded-lg border border-[#D6D8DC] bg-white px-4 py-3 text-sm text-[#2C2C2C] outline-none transition focus:border-[#4A7AAC] focus:ring-2 focus:ring-[#4A7AAC]/20"
                                                placeholder="Your name"
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-[#1B3A6B]">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full rounded-lg border border-[#D6D8DC] bg-white px-4 py-3 text-sm text-[#2C2C2C] outline-none transition focus:border-[#4A7AAC] focus:ring-2 focus:ring-[#4A7AAC]/20"
                                                placeholder="your@email.com"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-[#1B3A6B]">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className="w-full rounded-lg border border-[#D6D8DC] bg-white px-4 py-3 text-sm text-[#2C2C2C] outline-none transition focus:border-[#4A7AAC] focus:ring-2 focus:ring-[#4A7AAC]/20"
                                            placeholder="What is this about?"
                                        />
                                        {errors.subject && (
                                            <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-[#1B3A6B]">
                                            Message
                                        </label>
                                        <textarea
                                            rows={5}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="w-full resize-none rounded-lg border border-[#D6D8DC] bg-white px-4 py-3 text-sm text-[#2C2C2C] outline-none transition focus:border-[#4A7AAC] focus:ring-2 focus:ring-[#4A7AAC]/20"
                                            placeholder="Your message..."
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center gap-2 rounded-lg bg-[#1B3A6B] px-7 py-3 font-semibold text-white shadow-md transition hover:bg-[#142D54] disabled:opacity-50"
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

            {/* Map Placeholder */}
            <section className="bg-[#f7f8fa]">
                <div className="mx-auto max-w-7xl px-4 py-12">
                    <div className="overflow-hidden rounded-xl bg-[#D6D8DC]/40">
                        <div className="flex h-80 items-center justify-center">
                            <div className="text-center">
                                <MapPin size={48} className="mx-auto mb-3 text-[#1B3A6B]/30" />
                                <p className="text-lg font-semibold text-[#1B3A6B]/50">
                                    Google Map
                                </p>
                                <p className="text-sm text-[#2C2C2C]/40">
                                    Your Location Here
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </FrontLayout>
    );
}
