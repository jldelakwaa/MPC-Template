import { Link } from '@inertiajs/react';
import React from 'react';

interface Crumb {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: Crumb[];
    className?: string; // additional wrapper classes
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
    return (
        <div className={`sticky top-[72px] z-30 -mt-3 md:-mt-5 ${className}`}>
            <div className="mx-auto max-w-7xl px-4">
                <div
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm shadow-lg backdrop-blur-md"
                    style={{
                        borderColor: 'var(--crumb-border)',
                        backgroundColor: 'var(--crumb-bg)',
                        color: 'var(--crumb-text)',
                        boxShadow: '0 10px 24px var(--crumb-shadow)',
                    }}
                >
                {items.map((item, idx) => (
                    <React.Fragment key={idx}>
                        {item.href ? (
                            <Link href={item.href} className="text-[var(--crumb-link)] transition hover:text-[var(--crumb-link-hover)]">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="font-semibold">{item.label}</span>
                        )}
                        {idx < items.length - 1 && <span style={{ color: 'var(--crumb-separator)' }}>/</span>}
                    </React.Fragment>
                ))}
                </div>
            </div>
        </div>
    );
}
