import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import { Droplets, CheckCircle, ArrowRight } from 'lucide-react';

export default function AquaBope() {
    return (
        <FrontLayout title="Water Station">
            {/* Hero Banner */}
            <section className="bg-gradient-to-br from-[#1B3A6B] via-[#4A7AAC]/50 to-[#2E6B6B]/50 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-[#F0F4F8]">Water Station</h1>
                    <p className="mt-3 text-lg text-[#F0F4F8]/70">
                        Safe & Quality Purified Drinking Water
                    </p>
                    <div className="mx-auto mt-3 h-1 w-16 rounded bg-[#2E6B6B]" />
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="bg-[#D6D8DC]/30">
                <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-[#2C2C2C]/60">
                    <Link href="/" className="hover:text-[#1B3A6B]">Home</Link>
                    <span>/</span>
                    <Link href="#" className="hover:text-[#1B3A6B]">Products & Services</Link>
                    <span>/</span>
                    <span className="font-medium text-[#1B3A6B]">Water Station</span>
                </div>
            </div>

            {/* Content */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid items-center gap-12 md:grid-cols-2">
                        <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#2E6B6B] to-[#4A7AAC] p-16">
                            <div className="text-center">
                                <Droplets size={80} className="mx-auto text-white/30" />
                                <p className="mt-4 text-lg font-bold text-white">Water Station</p>
                                <p className="text-sm text-white/60">Photo coming soon</p>
                            </div>
                        </div>
                        <div>
                            <div className="mb-4 inline-block rounded-md bg-[#2E6B6B] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                                Established
                            </div>
                            <h2 className="mb-6 text-3xl font-bold text-[#1B3A6B]">
                                Pure Water, Pure Quality
                            </h2>
                            <p className="mb-6 leading-relaxed text-[#2C2C2C]/70">
                                Our water refilling station guarantees a
                                consistent supply of safe and quality purified drinking water to
                                cooperative members and the general public.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Multi-stage water purification system',
                                    'Affordable pricing for members and public',
                                    'Convenient location',
                                    'Strict quality control standards',
                                    'Available for walk-in and delivery',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[#2C2C2C]">
                                        <CheckCircle size={16} className="shrink-0 text-[#2E6B6B]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-[#1B3A6B] to-[#4A7AAC] py-14">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-white">Order Your Water Today</h2>
                    <p className="mx-auto mb-6 max-w-xl text-white/80">
                        Contact us for orders and delivery inquiries.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#2E6B6B] px-7 py-3 font-semibold text-white transition hover:bg-[#245858]"
                    >
                        Contact Us <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </FrontLayout>
    );
}
