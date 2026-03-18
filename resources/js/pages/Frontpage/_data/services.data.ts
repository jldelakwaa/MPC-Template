import type { LucideIcon } from 'lucide-react';
import { Banknote, PiggyBank, Palmtree, Droplets, Building2 } from 'lucide-react';

export interface ServiceEntry {
    icon: LucideIcon;
    title: string;
    description: string;
    href: string;
}

export const services: ServiceEntry[] = [
    {
        icon: Banknote,
        title: 'Loans',
        description: 'Flexible loan products designed to meet your financial needs, from personal to business loans.',
        href: '/services/loans',
    },
    {
        icon: PiggyBank,
        title: 'Savings & Deposits',
        description: 'Grow your money with competitive interest rates through our range of savings products.',
        href: '/services/savings',
    },
    {
        icon: Palmtree,
        title: 'Hostel',
        description: 'Experience our Hostel services and enjoy memorable stays at our cooperative facilities.',
        href: '/services/hostel',
    },
    {
        icon: Droplets,
        title: 'Water Refilling',
        description: 'Access clean and affordable purified water through our cooperative refilling station.',
        href: '/services/water-refilling',
    },
    {
        icon: Building2,
        title: 'Commercial Building',
        description: 'Leasing and commercial space solutions available through our cooperative-owned building.',
        href: '/services/commercial-building',
    },
];
