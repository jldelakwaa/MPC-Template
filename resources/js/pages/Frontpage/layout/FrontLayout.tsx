import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { useState } from 'react';
import {
    Menu,
    X,
    ChevronDown,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Clock,
} from 'lucide-react';

interface FrontLayoutProps {
    title: string;
    children: React.ReactNode;
}

const navItems = [
    { label: 'Home', href: '/' },
    {
        label: 'About Us',
        href: '#',
        children: [
            { label: 'Gallery', href: '/about/gallery' },
            { label: 'History', href: '/about/history' },
            { label: 'Membership', href: '/about/membership' },
        ],
    },
    {
        label: 'Products & Services',
        href: '#',
        children: [
            { label: 'Loans', href: '/services/loans' },
            { label: 'Savings', href: '/services/savings' },
            { label: 'Hospitality', href: '/services/safari' },
            { label: 'Water Station', href: '/services/aqua-bope' },
            { label: 'Commercial Building', href: '/services/commercial-building' },
        ],
    },
    { label: 'FAQs', href: '/faqs' },
    { label: 'News & Updates', href: '/news' },
    { label: 'Officers', href: '/officers' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Downloads', href: '/downloads' },
];

const appName = import.meta.env.VITE_APP_NAME || 'Cooperative';
const appLogo = import.meta.env.VITE_APP_LOGO_URL || '';

export default function FrontLayout({ title, children }: FrontLayoutProps) {
    const { auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <>
            <Head title={title}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:300,400,500,600,700,800&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex min-h-screen flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
                {/* Top Bar */}
                <div className="bg-[#142D54] text-[#F0F4F8]">
                    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-2 text-xs sm:text-sm">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <Phone size={13} />
                                (000) 000-0000
                            </span>
                            <span className="hidden items-center gap-1 sm:flex">
                                <Mail size={13} />
                                info@cooperative.com
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <Clock size={13} />
                                Mon-Fri 8AM-5PM
                            </span>
                            {auth.user ? (
                                <Link
                                    href="/dashboard"
                                    className="rounded bg-[#2E6B6B] px-3 py-1 text-xs font-medium text-white transition hover:bg-[#245858]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="rounded bg-[#4A7AAC] px-3 py-1 text-xs font-medium text-white transition hover:bg-[#3d6a99]"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Header */}
                <header className="sticky top-0 z-50 bg-[#1B3A6B] shadow-lg">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-0">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 py-3">
                            {appLogo ? (
                                <img src={appLogo} alt={appName} className="h-12 w-12 rounded-full object-cover" />
                            ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl font-bold text-[#F0F4F8]">
                                    {appName.charAt(0)}
                                </div>
                            )}
                            <div className="hidden sm:block">
                                <h1 className="text-lg font-bold leading-tight text-[#F0F4F8]">
                                    {appName}
                                </h1>
                                <p className="text-[10px] leading-tight tracking-wider text-[#F0F4F8]/70">
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
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-1 px-3.5 py-5 text-sm font-medium transition-colors ${
                                            currentPath === item.href
                                                ? 'bg-[#4A7AAC] text-white'
                                                : 'text-[#F0F4F8] hover:bg-[#4A7AAC]/60'
                                        }`}
                                    >
                                        {item.label}
                                        {item.children && <ChevronDown size={14} />}
                                    </Link>
                                    {item.children && openDropdown === item.label && (
                                        <div className="absolute left-0 top-full z-50 min-w-[220px] rounded-b-lg border border-[#1B3A6B]/20 bg-white py-1 shadow-xl">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className={`block px-5 py-2.5 text-sm transition-colors ${
                                                        currentPath === child.href
                                                            ? 'bg-[#2E6B6B]/10 font-semibold text-[#1B3A6B]'
                                                            : 'text-[#2C2C2C] hover:bg-[#D6D8DC]/50 hover:text-[#1B3A6B]'
                                                    }`}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="rounded-md p-2 text-[#F0F4F8] lg:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>

                    {/* Mobile Nav */}
                    {mobileMenuOpen && (
                        <div className="border-t border-[#4A7AAC]/30 bg-[#1B3A6B] lg:hidden">
                            <nav className="mx-auto max-w-7xl divide-y divide-[#4A7AAC]/20 px-4">
                                {navItems.map((item) => (
                                    <div key={item.label}>
                                        {item.children ? (
                                            <>
                                                <button
                                                    className="flex w-full items-center justify-between py-3 text-sm font-medium text-[#F0F4F8]"
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
                                                                className="block py-2 text-sm text-[#F0F4F8]/80 hover:text-white"
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
                                                className="block py-3 text-sm font-medium text-[#F0F4F8]"
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
                <footer className="bg-[#1B3A6B] text-[#F0F4F8]">
                    <div className="mx-auto max-w-7xl px-4 py-12">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {/* About */}
                            <div>
                                <div className="mb-4 flex items-center gap-3">
                                    {appLogo ? (
                                        <img src={appLogo} alt={appName} className="h-10 w-10 rounded-full object-cover" />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg font-bold">
                                            {appName.charAt(0)}
                                        </div>
                                    )}
                                    <h3 className="text-lg font-bold">{appName}</h3>
                                </div>
                                <p className="text-sm leading-relaxed text-[#F0F4F8]/70">
                                    Multi-Purpose Cooperative — empowering
                                    members towards economic success and
                                    financial freedom.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#4A7AAC]">
                                    Quick Links
                                </h4>
                                <ul className="space-y-2 text-sm text-[#F0F4F8]/70">
                                    <li>
                                        <Link href="/about/history" className="transition hover:text-white">
                                            Our History
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about/membership" className="transition hover:text-white">
                                            Membership
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/services/loans" className="transition hover:text-white">
                                            Loan Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/services/savings" className="transition hover:text-white">
                                            Savings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/faqs" className="transition hover:text-white">
                                            FAQs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/downloads" className="transition hover:text-white">
                                            Downloadable Forms
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Services */}
                            <div>
                                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#4A7AAC]">
                                    Our Services
                                </h4>
                                <ul className="space-y-2 text-sm text-[#F0F4F8]/70">
                                    <li>
                                        <Link href="/services/loans" className="transition hover:text-white">
                                            Credit & Lending
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/services/savings" className="transition hover:text-white">
                                            Savings & Deposits
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/services/safari" className="transition hover:text-white">
                                            Hospitality
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/services/aqua-bope" className="transition hover:text-white">
                                            Water Station
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/services/commercial-building" className="transition hover:text-white">
                                            Commercial Building
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#4A7AAC]">
                                    Contact Us
                                </h4>
                                <ul className="space-y-3 text-sm text-[#F0F4F8]/70">
                                    <li className="flex items-start gap-2">
                                        <MapPin size={16} className="mt-0.5 shrink-0 text-[#2E6B6B]" />
                                        <span>
                                            Your Address Here
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Phone size={16} className="shrink-0 text-[#2E6B6B]" />
                                        (000) 000-0000
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Mail size={16} className="shrink-0 text-[#2E6B6B]" />
                                        info@cooperative.com
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Clock size={16} className="shrink-0 text-[#2E6B6B]" />
                                        Mon-Fri, 8:00 AM - 5:00 PM
                                    </li>
                                </ul>
                                <div className="mt-4 flex items-center gap-3">
                                    <a
                                        href="#"
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#4A7AAC]"
                                    >
                                        <Facebook size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10">
                        <div className="mx-auto max-w-7xl px-4 py-4">
                            <p className="text-center text-xs text-[#F0F4F8]/50">
                                &copy; {new Date().getFullYear()} Multi-Purpose Cooperative. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
