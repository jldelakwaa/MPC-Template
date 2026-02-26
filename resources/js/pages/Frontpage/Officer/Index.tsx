import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import { Users } from 'lucide-react';

interface Officer {
    id: number;
    name: string;
    position: string;
    birthday: string | null;
    yearservice: string | null;
    image: string | null;
    officer_category_id: number;
    category?: { id: number; name: string };
}

interface OfficerCategory {
    id: number;
    name: string;
    description: string | null;
    officers: Officer[];
}

interface Props {
    categories: OfficerCategory[];
}

export default function OfficersPage({ categories = [] }: Props) {
    return (
        <FrontLayout title="Officers">
            {/* Hero Banner */}
            <section className="bg-gradient-to-br from-[#1B3A6B] via-[#4A7AAC]/50 to-[#2E6B6B]/50 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-[#F0F4F8]">Our Officers</h1>
                    <p className="mt-3 text-lg text-[#F0F4F8]/70">
                        Meet the people behind our cooperative
                    </p>
                    <div className="mx-auto mt-3 h-1 w-16 rounded bg-[#2E6B6B]" />
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="bg-[#D6D8DC]/30">
                <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-[#2C2C2C]/60">
                    <Link href="/" className="hover:text-[#1B3A6B]">Home</Link>
                    <span>/</span>
                    <span className="font-medium text-[#1B3A6B]">Officers</span>
                </div>
            </div>

            {/* Officers by Category */}
            {categories.length > 0 ? (
                categories.map((category) => (
                    <section key={category.id} className="bg-white py-12 odd:bg-[#f7f8fa]">
                        <div className="mx-auto max-w-7xl px-4">
                            <div className="mb-8 text-center">
                                <h2 className="text-2xl font-bold text-[#1B3A6B]">{category.name}</h2>
                                {category.description && (
                                    <p className="mt-2 text-sm text-[#2C2C2C]/60">{category.description}</p>
                                )}
                                <div className="mx-auto mt-2 h-1 w-12 rounded bg-[#2E6B6B]" />
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {category.officers.map((officer) => (
                                    <div
                                        key={officer.id}
                                        className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#1B3A6B] to-[#4A7AAC]">
                                            {officer.image ? (
                                                <img
                                                    src={`/storage/${officer.image}`}
                                                    alt={officer.name}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center">
                                                    <Users size={48} className="text-white/20" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 text-center">
                                            <h3 className="text-lg font-bold text-[#1B3A6B]">
                                                {officer.name}
                                            </h3>
                                            <p className="mt-1 text-sm font-medium text-[#2E6B6B]">
                                                {officer.position}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                ))
            ) : (
                <section className="bg-[#f7f8fa] py-20">
                    <div className="text-center">
                        <Users className="mx-auto mb-4 text-[#D6D8DC]" size={48} />
                        <p className="text-lg text-[#2C2C2C]/50">Officer information coming soon.</p>
                    </div>
                </section>
            )}
        </FrontLayout>
    );
}
