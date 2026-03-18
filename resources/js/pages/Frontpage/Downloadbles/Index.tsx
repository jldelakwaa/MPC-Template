import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import Breadcrumb from '@/components/Breadcrumb';
import FrontHero from '@/components/FrontHero';
import { Download, FileText, FolderOpen, Search } from 'lucide-react';
import { useState } from 'react';

interface Downloadable {
    id: number;
    title: string;
    downloadable_form: string | null;
    downloadable_category_id: number;
    category?: { id: number; category_name: string };
}

interface DownloadableCategory {
    id: number;
    category_name: string;
    description: string | null;
}

interface Props {
    downloadables: Downloadable[];
    categories: DownloadableCategory[];
}

export default function Downloads({ downloadables = [], categories = [] }: Props) {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [search, setSearch] = useState('');

    const filtered = downloadables.filter((d) => {
        const matchesCategory = activeCategory
            ? d.downloadable_category_id === activeCategory
            : true;
        const matchesSearch = search
            ? d.title.toLowerCase().includes(search.toLowerCase())
            : true;
        return matchesCategory && matchesSearch;
    });

    return (
        <FrontLayout title="Downloadable Forms">
            {/* Hero Banner */}
            <FrontHero
                eyebrow="Forms & Documents"
                title="Downloadable Forms"
                subtitle="Official forms and documents for members and applicants."
            />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Downloadable Forms' },
                ]}
            />

            {/* Search & Filter */}
            <section className="bg-card py-8">
                <div className="mx-auto max-w-5xl px-4">
                    <div className="relative mb-6">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40"
                        />
                        <input
                            type="text"
                            placeholder="Search forms..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-border bg-brand-surface py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                        />
                    </div>
                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveCategory(null)}
                                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                                    activeCategory === null
                                        ? 'bg-brand-navy text-white'
                                        : 'bg-brand-border/40 text-foreground hover:bg-brand-border'
                                }`}
                            >
                                All
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                                        activeCategory === cat.id
                                            ? 'bg-brand-navy text-white'
                                            : 'bg-brand-border/40 text-foreground hover:bg-brand-border'
                                    }`}
                                >
                                    {cat.category_name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Downloads List */}
            <section className="bg-brand-surface py-12">
                <div className="mx-auto max-w-5xl px-4">
                    {filtered.length > 0 ? (
                        <div className="space-y-3">
                            {filtered.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between rounded-xl bg-card p-5 shadow-sm transition-all hover:shadow-md"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-navy/10 text-foreground">
                                            <FileText size={22} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground">{item.title}</h3>
                                            {item.category && (
                                                <span className="text-xs text-brand-teal">
                                                    {item.category.category_name}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {item.downloadable_form ? (
                                        <a
                                            href={`/storage/${item.downloadable_form}`}
                                            download
                                            className="flex items-center gap-2 rounded-lg bg-brand-teal px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-teal-dark"
                                        >
                                            <Download size={16} />
                                            <span className="hidden sm:inline">Download</span>
                                        </a>
                                    ) : (
                                        <span className="rounded-lg bg-muted px-5 py-2.5 text-sm font-medium text-muted-foreground">
                                            File unavailable
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <FolderOpen className="mx-auto mb-4 text-brand-border" size={48} />
                            <p className="text-lg text-muted-foreground">
                                {search
                                    ? 'No forms match your search.'
                                    : 'No downloadable forms available yet.'}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </FrontLayout>
    );
}

