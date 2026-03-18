import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { appConfig } from '@/config/env';
import { useState } from 'react';
import {
    Menu,
    X,
    ChevronDown,
    Phone,
    Mail,
    MapPin,
    Clock,
} from 'lucide-react';
import NavLink from '@/components/NavLink';
import { defaultNavItems, defaultContactInfo, defaultFooterConfig } from '../_data/layout.data';

export interface NavChildItem {
    label: string;
    href: string;
}

export interface FrontNavItem {
    label: string;
    href: string;
    children?: NavChildItem[];
}

export interface FooterLinkItem {
    label: string;
    href: string;
}

export interface SiteContactInfo {
    phone: string;
    email: string;
    address: string;
    hours: string;
    facebookUrl?: string;
}

export interface FooterConfig {
    tagline?: string;
    quickLinks?: FooterLinkItem[];
    serviceLinks?: FooterLinkItem[];
}

interface FrontLayoutProps {
    title: string;
    children: React.ReactNode;
    navItems?: FrontNavItem[];
    contactInfo?: Partial<SiteContactInfo>;
    footerConfig?: FooterConfig;
}

const appName = appConfig.name;
const appLogo = appConfig.logoUrl;

export default function FrontLayout({
    title,
    children,
    navItems = defaultNavItems,
    contactInfo: contactInfoProp,
    footerConfig: footerConfigProp,
}: FrontLayoutProps) {
    const contact: SiteContactInfo = { ...defaultContactInfo, ...contactInfoProp };
    const footer: Required<FooterConfig> = { ...defaultFooterConfig, ...footerConfigProp };

    const { auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <>
            <Head title={title} />

            <div className="flex min-h-screen flex-col">
                {/* Top Bar */}
                <div className="bg-brand-navy-dark text-brand-light">
                    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-2 text-xs sm:text-sm">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <Phone size={13} />
                                {contact.phone}
                            </span>
                            <span className="hidden items-center gap-1 sm:flex">
                                <Mail size={13} />
                                {contact.email}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <Clock size={13} />
                                {contact.hours}
                            </span>
                            {auth.user ? (
                                <Link
                                    href="/dashboard"
                                    className="rounded bg-brand-teal px-3 py-1 text-xs font-medium text-white transition hover:bg-brand-teal-dark"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="rounded bg-brand-blue px-3 py-1 text-xs font-medium text-white transition hover:bg-brand-blue-dark"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Header */}
                <header className="sticky top-0 z-50 bg-brand-navy shadow-lg">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-0">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 py-3">
                            {appLogo ? (
                                <img src={appLogo} alt={appName} className="h-12 w-12 rounded-full object-cover" />
                            ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-card/10 text-xl font-bold text-brand-light">
                                    {appName.charAt(0)}
                                </div>
                            )}
                            <div className="hidden sm:block">
                                <h1 className="text-lg font-bold leading-tight text-brand-light">
                                    {appName}
                                </h1>
                                <p className="text-[10px] leading-tight tracking-wider text-brand-light/70">
                                    Multi-Purpose Cooperative
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden items-center gap-0 lg:flex">
                            {navItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="group relative"
                                    onMouseEnter={() =>
                                        item.children && setOpenDropdown(item.label)
                                    }
                                    onMouseLeave={() =>
                                        item.children && setOpenDropdown(null)
                                    }
                                >
                                    <NavLink
                                        href={item.href}
                                        current={currentPath === item.href}
                                        className="justify-center text-brand-light"
                                    >
                                        {item.label}
                                        {item.children && <ChevronDown size={14} />}
                                    </NavLink>
                                    {item.children && openDropdown === item.label && (
                                        <div className="absolute left-0 top-full z-50 min-w-[220px] rounded-b-lg border border-brand-navy/20 bg-card py-1 shadow-xl">
                                            {item.children.map((child) => (
                                                <NavLink
                                                    key={child.label}
                                                    href={child.href}
                                                    current={currentPath === child.href}
                                                    className="text-foreground justify-start px-5 py-2.5"
                                                >
                                                    {child.label}
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="rounded-md p-2 text-brand-light lg:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>

                    {/* Mobile Nav */}
                    {mobileMenuOpen && (
                        <div className="border-t border-brand-blue/30 bg-brand-navy lg:hidden">
                            <nav className="mx-auto max-w-7xl divide-y divide-brand-blue/20 px-4">
                                {navItems.map((item) => (
                                    <div key={item.label}>
                                        {item.children ? (
                                            <>
                                                <button
                                                    className="flex w-full items-center justify-between py-3 text-sm font-medium text-brand-light"
                                                    onClick={() =>
                                                        setOpenDropdown(
                                                            openDropdown === item.label ? null : item.label,
                                                        )
                                                    }
                                                >
                                                    {item.label}
                                                    <ChevronDown
                                                        size={14}
                                                        className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}
                                                    />
                                                </button>
                                                {openDropdown === item.label && (
                                                    <div className="pb-2 pl-4">
                                                        {item.children.map((child) => (
                                                            <Link
                                                                key={child.label}
                                                                href={child.href}
                                                                className={`block py-2 text-sm font-medium transition-colors hover:underline ${currentPath === child.href ? 'font-semibold underline' : ''} text-brand-light/80`}
                                                                onClick={() => setMobileMenuOpen(false)}
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className={`block py-3 text-sm font-medium transition-colors hover:underline ${currentPath === item.href ? 'font-semibold underline' : ''} text-brand-light`}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>
                    )}
                </header>

                {/* Main Content */}
                <main className="flex-1">{children}</main>

                {/* Footer */}
                <footer className="bg-brand-navy text-brand-light">
                    <div className="mx-auto max-w-7xl px-4 py-12">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {/* About */}
                            <div>
                                <div className="mb-4 flex items-center gap-3">
                                    {appLogo ? (
                                        <img src={appLogo} alt={appName} className="h-10 w-10 rounded-full object-cover" />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card/10 text-lg font-bold">
                                            {appName.charAt(0)}
                                        </div>
                                    )}
                                    <h3 className="text-lg font-bold">{appName}</h3>
                                </div>
                                <p className="text-sm leading-relaxed text-brand-light/70">
                                    {footer.tagline}
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-blue">
                                    Quick Links
                                </h4>
                                <ul className="space-y-2 text-sm text-brand-light/70">
                                    {footer.quickLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="transition hover:text-white">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Services */}
                            <div>
                                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-blue">
                                    Our Services
                                </h4>
                                <ul className="space-y-2 text-sm text-brand-light/70">
                                    {footer.serviceLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="transition hover:text-white">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-blue">
                                    Contact Us
                                </h4>
                                <ul className="space-y-3 text-sm text-brand-light/70">
                                    <li className="flex items-start gap-2">
                                        <MapPin size={16} className="mt-0.5 shrink-0 text-brand-teal" />
                                        <span>{contact.address}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Phone size={16} className="shrink-0 text-brand-teal" />
                                        {contact.phone}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Mail size={16} className="shrink-0 text-brand-teal" />
                                        {contact.email}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Clock size={16} className="shrink-0 text-brand-teal" />
                                        {contact.hours}
                                    </li>
                                </ul>
                                {contact.facebookUrl && (
                                    <div className="mt-4">
                                        {/* Previous Facebook logo button (kept for reuse)
                                        <a
                                            href={contact.facebookUrl}
                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-card/10 transition hover:bg-brand-blue"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Facebook size={16} />
                                        </a>
                                        */}
                                        <a
                                            href={contact.facebookUrl}
                                            className="text-sm font-medium text-brand-blue underline-offset-2 transition hover:text-white hover:underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Visit our Facebook page
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10">
                        <div className="mx-auto max-w-7xl px-4 py-4">
                            <p className="text-center text-xs text-brand-light/50">
                                &copy; {new Date().getFullYear()} {appName}. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

