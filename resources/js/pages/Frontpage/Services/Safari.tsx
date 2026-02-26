import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import { Hotel, Star, MapPin, Phone, ArrowRight } from 'lucide-react';

export default function Safari() {
    return (
        <FrontLayout title="Hospitality">
            {/* Hero Banner */}
            <section className="bg-gradient-to-br from-[#1B3A6B] via-[#4A7AAC]/50 to-[#2E6B6B]/50 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-[#F0F4F8]">Hospitality</h1>
                    <p className="mt-3 text-lg text-[#F0F4F8]/70">
                        Safe, Affordable, Friendly and Relaxing Inn
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
                    <span className="font-medium text-[#1B3A6B]">Hospitality</span>
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
                                Your Home Away from Home
                            </h2>
                            <p className="mb-6 leading-relaxed text-[#2C2C2C]/70">
                                Our hospitality venture offers a safe, affordable, friendly, and
                                relaxing accommodation experience for cooperative members and guests.
                                Conveniently located and well-maintained, it provides comfortable rooms
                                at affordable rates.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: Star, label: 'Comfortable Rooms' },
                                    { icon: Hotel, label: 'Affordable Rates' },
                                    { icon: MapPin, label: 'Convenient Location' },
                                    { icon: Phone, label: 'Easy Booking' },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-3 rounded-lg bg-[#D6D8DC]/30 p-3">
                                        <item.icon size={20} className="text-[#2E6B6B]" />
                                        <span className="text-sm font-medium text-[#1B3A6B]">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#1B3A6B] to-[#4A7AAC] p-16">
                            <div className="text-center">
                                <Hotel size={80} className="mx-auto text-white/30" />
                                <p className="mt-4 text-lg font-bold text-white">Cooperative Inn</p>
                                <p className="text-sm text-white/60">Photo coming soon</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-[#1B3A6B] to-[#4A7AAC] py-14">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-white">Interested in Booking?</h2>
                    <p className="mx-auto mb-6 max-w-xl text-white/80">
                        Contact us for room availability and rates.
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
