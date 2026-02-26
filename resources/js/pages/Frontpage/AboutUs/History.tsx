import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import { Calendar, Building2 } from 'lucide-react';

const milestones = [
    {
        year: '20XX',
        title: 'Cooperative Founded',
        description:
            'The cooperative was organized and registered with the Cooperative Development Authority. It was established to serve as a financial aid vehicle for members, promoting economic success and financial freedom.',
    },
    {
        year: '20XX',
        title: 'Credit & Lending Launched',
        description:
            'Credit and Lending was the first service offered by the Cooperative to its members, providing accessible financial support.',
    },
    {
        year: '20XX',
        title: 'Savings Operations Launched',
        description:
            'Members savings operation was launched, offering high yield interest rates on regular and time deposits.',
    },
    {
        year: '20XX',
        title: 'Commercial Building Completed',
        description:
            'Construction of the cooperative\'s commercial building was completed. Rentable office spaces were opened for leasing with the main office at the ground floor.',
    },
    {
        year: '20XX',
        title: 'Hospitality Venture Opened',
        description:
            'Grand opening and launching of the cooperative\'s hospitality venture — a Safe, Affordable, Friendly and Relaxing Inn.',
    },
    {
        year: '20XX',
        title: 'Water Station Opened',
        description:
            'To guarantee consistent supply of safe and quality purified drinking water to the members and the public, a water refilling station was created and opened for business.',
    },
    {
        year: '20XX',
        title: 'Fuel Station Opened',
        description:
            'A fuel station was opened, catering to the fuel needs of the general public and adding value to the Cooperative.',
    },
];

export default function History() {
    return (
        <FrontLayout title="Our History">
            {/* Hero Banner */}
            <section className="bg-gradient-to-br from-[#1B3A6B] via-[#4A7AAC]/50 to-[#2E6B6B]/50 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-[#F0F4F8]">Our History</h1>
                    <p className="mt-3 text-lg text-[#F0F4F8]/70">
                        Over the years of empowering members through cooperation
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
                    <span className="font-medium text-[#1B3A6B]">History</span>
                </div>
            </div>

            {/* Intro */}
            <section className="bg-white py-12">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <Building2 className="mx-auto mb-4 text-[#1B3A6B]" size={40} />
                    <p className="text-lg leading-relaxed text-[#2C2C2C]">
                        The cooperative was organized and registered with the Cooperative
                        Development Authority. Born from the vision of its founding members,
                        the cooperative was established to provide
                        financial aid and pathways to economic success for its members.
                    </p>
                </div>
            </section>

            {/* Timeline */}
            <section className="bg-[#f7f8fa] py-16">
                <div className="mx-auto max-w-4xl px-4">
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-[#1B3A6B]/20 md:left-1/2 md:block" />

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
                                        <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
                                            <div className="mb-2 flex items-center gap-2 md:justify-end">
                                                <Calendar size={16} className="text-[#2E6B6B]" />
                                                <span className="text-sm font-bold text-[#2E6B6B]">
                                                    {m.year}
                                                </span>
                                            </div>
                                            <h3 className="mb-2 text-xl font-bold text-[#1B3A6B]">
                                                {m.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-[#2C2C2C]/70">
                                                {m.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Dot */}
                                    <div className="absolute left-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#1B3A6B] bg-white md:left-1/2 md:block" style={{ top: '28px' }} />

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
