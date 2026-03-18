import { Link } from '@inertiajs/react';
import React from 'react';

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    current?: boolean;
    className?: string;
    onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
    // allow any other props (e.g. data-*, target)
    // allow arbitrary attributes like data-*, target, etc.
    [key: string]: unknown;
}

// base styles applied to every navigation link; block-level and full width so hover/bg covers the
// entire "pill". justify-center keeps the text centered, but can be overridden via className.
const baseStyles =
    'flex items-center justify-center gap-1 px-3.5 py-5 text-sm font-medium transition-colors text-center';
const hoverStyles = 'hover:underline hover:text-blue';
// active style now mimics link look (underline + font-weight) instead of block bg
const activeStyles = 'underline font-semibold';
// Note: no default text color here; callers must supply text color via className

export default function NavLink({
    href,
    children,
    current = false,
    className = '',
    onClick,
    ...rest
}: NavLinkProps) {
    return (
        <Link
            href={href}
            className={`${baseStyles} ${current ? activeStyles : ''} ${hoverStyles} ${className}`}
            onClick={onClick}
            {...rest}
        >
            {children}
        </Link>
    );
}
