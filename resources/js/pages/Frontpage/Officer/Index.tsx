import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import Breadcrumb from '@/components/Breadcrumb';
import FrontHero from '@/components/FrontHero';
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
            <FrontHero
                eyebrow="Leadership"
                title="Officers & Leadership"
                subtitle="Meet the elected leaders guiding our cooperative."
            />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Officers' },
                ]}
            />

            {/* Officers by Category */}
            {categories.length > 0 ? (
                categories.map((category) => (
                    <section key={category.id} className="bg-card py-12 odd:bg-brand-surface">
                        <div className="mx-auto max-w-7xl px-4">
                            <div className="mb-8 text-center">
                                <h2 className="text-2xl font-bold text-foreground">{category.name}</h2>
                                {category.description && (
                                    <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
                                )}
                                <div className="mx-auto mt-2 h-1 w-12 rounded bg-brand-teal" />
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {category.officers.map((officer) => (
                                    <div
                                        key={officer.id}
                                        className="group overflow-hidden rounded-xl bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-brand-navy to-brand-blue">
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
                                            <h3 className="text-lg font-bold text-foreground">
                                                {officer.name}
                                            </h3>
                                            <p className="mt-1 text-sm font-medium text-brand-teal">
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
                <section className="bg-brand-surface py-20">
                    <div className="text-center">
                        <Users className="mx-auto mb-4 text-brand-border" size={48} />
                        <p className="text-lg text-muted-foreground">Officer information coming soon.</p>
                    </div>
                </section>
            )}
        </FrontLayout>
    );
}

