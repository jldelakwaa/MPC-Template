import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import Breadcrumb from '@/components/Breadcrumb';
import FrontHero from '@/components/FrontHero';
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
            <FrontHero
                eyebrow="About Us"
                title="Gallery"
                subtitle="Highlights from community events and milestones."
            />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'About Us', href: '/about' },
                    { label: 'Gallery' },
                ]}
            />

            {/* Category Filter */}
            <section className="bg-card py-8">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex flex-wrap items-center gap-2">
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
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="bg-brand-surface py-12">
                <div className="mx-auto max-w-7xl px-4">
                    {filtered.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {filtered.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="group cursor-pointer overflow-hidden rounded-xl bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                                    onClick={() => openLightbox(index)}
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-brand-navy/0 transition-all group-hover:bg-brand-navy/40">
                                            <Camera className="text-white opacity-0 transition group-hover:opacity-100" size={32} />
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                                        {item.category && (
                                            <p className="mt-1 text-xs text-brand-teal">{item.category.category_name}</p>
                                        )}
                                        {item.description && (
                                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <Camera className="mx-auto mb-4 text-brand-border" size={48} />
                            <p className="text-lg text-muted-foreground">No photos available yet.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {lightbox !== null && filtered[lightbox] && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
                    <button
                        onClick={closeLightbox}
                        className="absolute right-4 top-4 z-10 rounded-full bg-card/10 p-2 text-white hover:bg-card/20"
                    >
                        <X size={24} />
                    </button>
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card/10 p-2 text-white hover:bg-card/20"
                    >
                        <ChevronLeft size={28} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card/10 p-2 text-white hover:bg-card/20"
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

