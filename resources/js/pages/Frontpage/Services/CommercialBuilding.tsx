import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import { Building2, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export default function CommercialBuilding() {
    return (
        <FrontLayout title="Commercial Building">
            {/* Hero Banner */}
            <section className="bg-gradient-to-br from-[#1B3A6B] via-[#4A7AAC]/50 to-[#2E6B6B]/50 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-[#F0F4F8]">Commercial Building</h1>
                    <p className="mt-3 text-lg text-[#F0F4F8]/70">
                        Rentable Office & Commercial Spaces
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
                    <span className="font-medium text-[#1B3A6B]">Commercial Building</span>
                </div>
            </div>

            {/* Content */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid items-center gap-12 md:grid-cols-2">
                        <div>
                            <div className="mb-4 inline-block rounded-md bg-[#2E6B6B] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                                Established
                            </div>
                            <h2 className="mb-6 text-3xl font-bold text-[#1B3A6B]">
                                Prime Office Spaces
                            </h2>
                            <p className="mb-6 leading-relaxed text-[#2C2C2C]/70">
                                The cooperative's commercial building offers premium
                                rentable office spaces at strategic locations.
                                The cooperative office occupies the ground floor.
                            </p>
                            <div className="space-y-4">
                                <div className="rounded-xl bg-[#D6D8DC]/20 p-5">
                                    <div className="mb-2 flex items-center gap-2">
                                        <MapPin size={18} className="text-[#2E6B6B]" />
                                        <h4 className="font-semibold text-[#1B3A6B]">Main Branch</h4>
                                    </div>
                                    <p className="text-sm text-[#2C2C2C]/70">
                                        Main cooperative office and commercial spaces.
                                    </p>
                                </div>
                                <div className="rounded-xl bg-[#D6D8DC]/20 p-5">
                                    <div className="mb-2 flex items-center gap-2">
                                        <MapPin size={18} className="text-[#2E6B6B]" />
                                        <h4 className="font-semibold text-[#1B3A6B]">Branch 2</h4>
                                    </div>
                                    <p className="text-sm text-[#2C2C2C]/70">
                                        Additional commercial and office spaces.
                                    </p>
                                </div>
                            </div>
                            <ul className="mt-6 space-y-2">
                                {[
                                    'Strategic city-center locations',
                                    'Modern facilities and amenities',
                                    'Competitive rental rates',
                                    'Ample parking space',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-[#2C2C2C]">
                                        <CheckCircle size={14} className="text-[#2E6B6B]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#1B3A6B] to-[#4A7AAC] p-16">
                            <div className="text-center">
                                <Building2 size={80} className="mx-auto text-white/30" />
                                <p className="mt-4 text-lg font-bold text-white">Cooperative Building</p>
                                <p className="text-sm text-white/60">Photo coming soon</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-[#1B3A6B] to-[#4A7AAC] py-14">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-white">Interested in Renting?</h2>
                    <p className="mx-auto mb-6 max-w-xl text-white/80">
                        Contact us for available spaces and rental rates.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#2E6B6B] px-7 py-3 font-semibold text-white transition hover:bg-[#245858]"
                    >
                        Inquire Now <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </FrontLayout>
    );
}
