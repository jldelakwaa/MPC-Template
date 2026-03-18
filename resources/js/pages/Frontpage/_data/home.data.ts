import type { LucideIcon } from 'lucide-react';
import { HandCoins, PiggyBank, Hotel, Droplets, Building2 } from 'lucide-react';

export interface DefaultSlide {
    id: number;
    title: string;
    image: string;
    content: string;
    button_link: string | null;
    button_text: string | null;
}

export const defaultSlides: DefaultSlide[] = [
    {
        id: 1,
        title: 'Welcome to Our Cooperative',
        image: '',
        content: 'Empowering members towards economic success and financial freedom.',
        button_link: '/about/history',
        button_text: 'Learn More',
    },
    {
        id: 2,
        title: 'Flexible Loan Products',
        image: '',
        content: 'Access affordable loans tailored to your needs — from regular to emergency, gadget to livelihood loans.',
        button_link: '/services/loans',
        button_text: 'View Loans',
    },
    {
        id: 3,
        title: 'Grow Your Savings',
        image: '',
        content: 'High-yield interest rates on regular and time deposits. Start building your future with us today.',
        button_link: '/services/savings',
        button_text: 'Start Saving',
    },
];

export interface HomeService {
    icon: LucideIcon;
    title: string;
    description: string;
    href: string;
}

export const homeServices: HomeService[] = [
    {
        icon: HandCoins,
        title: 'Credit & Lending',
        description: 'Flexible loan products for every need — regular, emergency, livelihood, and more.',
        href: '/services/loans',
    },
    {
        icon: PiggyBank,
        title: 'Savings & Deposits',
        description: 'Competitive interest rates on regular savings, time deposits, and share capital.',
        href: '/services/savings',
    },
    {
        icon: Hotel,
        title: 'Hostel',
        description: 'A Safe, Affordable, Friendly and Relaxing Inn for members and guests.',
        href: '/services/safari',
    },
    {
        icon: Droplets,
        title: 'Aqua BOPE',
        description: 'Quality purified drinking water refilling station for members and the public.',
        href: '/services/aqua-bope',
    },
    {
        icon: Building2,
        title: 'Commercial Spaces',
        description: 'Rentable office and commercial spaces for businesses.',
        href: '/services/commercial-building',
    },
];

export interface HomeStat {
    label: string;
    value: string;
}

export const homeStats: HomeStat[] = [
    { label: 'Years of Service', value: '25+' },
    { label: 'Active Members', value: '3,000+' },
    { label: 'Loan Products', value: '10+' },
    { label: 'Business Ventures', value: '5' },
];
