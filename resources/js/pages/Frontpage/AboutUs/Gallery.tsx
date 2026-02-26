import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Gallery {
    id: number;
    title: string;
    description: string | null;
    gallery_category_id: number;
    year: string | null;
    image: string;
    category?: { id: number; category_name: string };
}

interface GalleryCategory {
    id: number;
    category_name: string;
}

interface Props {
    galleries: Gallery[];
    categories: GalleryCategory[];
}

export default function GalleryPage({ galleries = [], categories = [] }: Props) {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [lightbox, setLightbox] = useState<number | null>(null);

    const filtered = activeCategory
        ? galleries.filter((g) => g.gallery_category_id === activeCategory)
        : galleries;

    const openLightbox = (index: number) => setLightbox(index);
    const closeLightbox = () => setLightbox(null);
    const nextImage = () =>
        setLightbox((prev) => (prev !== null ? (prev + 1) % filtered.length : null));
    const prevImage = () =>
        setLightbox((prev) =>
            prev !== null ? (prev - 1 + filtered.length) % filtered.length : null,
        );

    return (
        <FrontLayout title="Gallery">
            {/* Hero Banner */}
            <section className="bg-gradient-to-br from-[#1B3A6B] via-[#4A7AAC]/50 to-[#2E6B6B]/50 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-[#F0F4F8]">Gallery</h1>
                    <p className="mt-3 text-lg text-[#F0F4F8]/70">
                        Moments captured from our cooperative's events, activities, and milestones
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
                    <span className="font-medium text-[#1B3A6B]">Gallery</span>
                </div>
            </div>

            {/* Category Filter */}
            <section className="bg-white py-8">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex flex-wrap items-center gap-2">
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
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="bg-[#f7f8fa] py-12">
                <div className="mx-auto max-w-7xl px-4">
                    {filtered.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {filtered.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                                    onClick={() => openLightbox(index)}
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-[#1B3A6B]/0 transition-all group-hover:bg-[#1B3A6B]/40">
                                            <Camera className="text-white opacity-0 transition group-hover:opacity-100" size={32} />
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-[#1B3A6B]">{item.title}</h3>
                                        {item.category && (
                                            <p className="mt-1 text-xs text-[#2E6B6B]">{item.category.category_name}</p>
                                        )}
                                        {item.description && (
                                            <p className="mt-1 line-clamp-2 text-xs text-[#2C2C2C]/60">{item.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <Camera className="mx-auto mb-4 text-[#D6D8DC]" size={48} />
                            <p className="text-lg text-[#2C2C2C]/50">No photos available yet.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {lightbox !== null && filtered[lightbox] && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
                    <button
                        onClick={closeLightbox}
                        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                    >
                        <X size={24} />
                    </button>
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                    >
                        <ChevronLeft size={28} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                    >
                        <ChevronRight size={28} />
                    </button>
                    <div className="max-h-[85vh] max-w-5xl">
                        <img
                            src={`/storage/${filtered[lightbox].image}`}
                            alt={filtered[lightbox].title}
                            className="max-h-[80vh] rounded-lg object-contain"
                        />
                        <div className="mt-3 text-center">
                            <h3 className="text-lg font-bold text-white">{filtered[lightbox].title}</h3>
                            {filtered[lightbox].description && (
                                <p className="mt-1 text-sm text-white/60">{filtered[lightbox].description}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </FrontLayout>
    );
}
