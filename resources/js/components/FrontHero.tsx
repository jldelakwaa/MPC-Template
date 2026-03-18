import React from 'react';

interface FrontHeroProps {
    title: string;
    subtitle?: string;
    eyebrow?: string;
    children?: React.ReactNode;
}

export default function FrontHero({ title, subtitle, eyebrow, children }: FrontHeroProps) {
    return (
        <section
            className="relative overflow-hidden border-b"
            style={{
                borderColor: 'var(--hero-border)',
                backgroundImage: 'linear-gradient(135deg, var(--hero-gradient-from), var(--hero-gradient-via), var(--hero-gradient-to))',
            }}
        >
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 15% 25%, var(--hero-glow-1), transparent 42%), radial-gradient(circle at 85% 15%, var(--hero-glow-2), transparent 34%), radial-gradient(circle at 50% 90%, var(--hero-glow-3), transparent 45%)',
                }}
            />
            <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                    backgroundImage:
                        'linear-gradient(var(--hero-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--hero-grid-line) 1px, transparent 1px)',
                    backgroundSize: '42px 42px',
                }}
            />

            <div className="relative mx-auto max-w-7xl px-4 py-14 md:py-20">
                <div className="mx-auto max-w-3xl text-center">
                    {eyebrow && (
                        <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: 'var(--hero-eyebrow)' }}>
                            {eyebrow}
                        </p>
                    )}
                    <h1 className="mt-2 text-3xl font-bold md:text-5xl" style={{ color: 'var(--hero-title)' }}>
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="mx-auto mt-3 max-w-2xl text-base md:text-lg" style={{ color: 'var(--hero-subtitle)' }}>
                            {subtitle}
                        </p>
                    )}
                    <div className="mx-auto mt-5 h-px w-20" style={{ backgroundColor: 'var(--hero-divider)' }} />
                    {children && <div className="mt-6">{children}</div>}
                </div>
            </div>
        </section>
    );
}
