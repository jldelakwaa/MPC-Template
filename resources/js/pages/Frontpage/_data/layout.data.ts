import type { FrontNavItem, SiteContactInfo, FooterConfig } from '../layout/FrontLayout';
import { contactInfo } from './contact.data';

export const defaultNavItems: FrontNavItem[] = [
    { label: 'Home', href: '/' },
    {
        label: 'About Us',
        href: '/about',
        children: [
            { label: 'About Us', href: '/about' },
            { label: 'Gallery', href: '/about/gallery' },
            { label: 'History', href: '/about/history' },
            { label: 'Membership', href: '/about/membership' },
        ],
    },
    {
        label: 'Products & Services',
        href: '/services',
        children: [
            { label: 'Products & Services', href: '/services' },
            { label: 'Loans', href: '/services/loans' },
            { label: 'Savings', href: '/services/savings' },
            { label: 'Hostel', href: '/services/hostel' },
            { label: 'Water Refilling', href: '/services/water-refilling' },
            { label: 'Commercial Building', href: '/services/commercial-building' },
        ],
    },
    { label: 'FAQs', href: '/faqs' },
    { label: 'News & Updates', href: '/news' },
    { label: 'Officers', href: '/officers' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Downloads', href: '/downloads' },
];

export const defaultContactInfo: SiteContactInfo = {
    phone: contactInfo.telephone[0]?.number ?? '',
    email: contactInfo.email,
    address: contactInfo.address,
    hours: contactInfo.officeHours,
    facebookUrl: contactInfo.facebookUrl,
};

export const defaultFooterConfig: Required<FooterConfig> = {
    tagline: 'Multi-Purpose Cooperative — empowering members towards economic success and financial freedom.',
    quickLinks: [
        { label: 'Our History', href: '/about/history' },
        { label: 'Membership', href: '/about/membership' },
        { label: 'Loan Products', href: '/services/loans' },
        { label: 'Savings', href: '/services/savings' },
        { label: 'FAQs', href: '/faqs' },
        { label: 'Downloadable Forms', href: '/downloads' },
    ],
    serviceLinks: [
        { label: 'Credit & Lending', href: '/services/loans' },
        { label: 'Savings & Deposits', href: '/services/savings' },
        { label: 'Hostel', href: '/services/hostel' },
        { label: 'Water Refilling', href: '/services/water-refilling' },
        { label: 'Commercial Building', href: '/services/commercial-building' },
    ],
};
