import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import { Download, FileText, FolderOpen, Search } from 'lucide-react';
import { useState } from 'react';

interface Downloadable {
    id: number;
    title: string;
    downloadable_form: string;
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
            <section className="bg-gradient-to-br from-[#1B3A6B] via-[#4A7AAC]/50 to-[#2E6B6B]/50 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-[#F0F4F8]">Downloadable Forms</h1>
                    <p className="mt-3 text-lg text-[#F0F4F8]/70">
                        Access and download the forms you need
                    </p>
                    <div className="mx-auto mt-3 h-1 w-16 rounded bg-[#2E6B6B]" />
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="bg-[#D6D8DC]/30">
                <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-[#2C2C2C]/60">
                    <Link href="/" className="hover:text-[#1B3A6B]">Home</Link>
                    <span>/</span>
                    <span className="font-medium text-[#1B3A6B]">Downloadable Forms</span>
                </div>
            </div>

            {/* Search & Filter */}
            <section className="bg-white py-8">
                <div className="mx-auto max-w-5xl px-4">
                    <div className="relative mb-6">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2C2C2C]/40"
                        />
                        <input
                            type="text"
                            placeholder="Search forms..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-[#D6D8DC] bg-[#f7f8fa] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#4A7AAC] focus:ring-2 focus:ring-[#4A7AAC]/20"
                        />
                    </div>
                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveCategory(null)}
                                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                                    activeCategory === null
                                        ? 'bg-[#1B3A6B] text-white'
                                        : 'bg-[#D6D8DC]/40 text-[#2C2C2C] hover:bg-[#D6D8DC]'
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
                                            ? 'bg-[#1B3A6B] text-white'
                                            : 'bg-[#D6D8DC]/40 text-[#2C2C2C] hover:bg-[#D6D8DC]'
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
            <section className="bg-[#f7f8fa] py-12">
                <div className="mx-auto max-w-5xl px-4">
                    {filtered.length > 0 ? (
                        <div className="space-y-3">
                            {filtered.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between rounded-xl bg-white p-5 shadow-sm transition-all hover:shadow-md"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1B3A6B]/10 text-[#1B3A6B]">
                                            <FileText size={22} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[#1B3A6B]">{item.title}</h3>
                                            {item.category && (
                                                <span className="text-xs text-[#2E6B6B]">
                                                    {item.category.category_name}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <a
                                        href={`/storage/${item.downloadable_form}`}
                                        download
                                        className="flex items-center gap-2 rounded-lg bg-[#2E6B6B] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#245858]"
                                    >
                                        <Download size={16} />
                                        <span className="hidden sm:inline">Download</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <FolderOpen className="mx-auto mb-4 text-[#D6D8DC]" size={48} />
                            <p className="text-lg text-[#2C2C2C]/50">
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
