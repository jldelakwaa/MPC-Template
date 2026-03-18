import type { ServiceDetailPageData } from '../Services/ServiceDetailPage';

export const aquaBopeData: ServiceDetailPageData = {
    hero: {
        title: 'Water Refilling Service',
        subtitle: 'For your safe drinking water',
    },
    content: {
        imagePosition: 'left',
        heading: 'WATER REFILLING SERVICE',
        description:
            'Our cooperative water refilling station is equipped with modern purification technology to serve consumers with quality and safe drinking water.',
        location:
            'Ground Floor, Annex Building, Main Street, City.',
        facebook: {
            url: 'https://www.facebook.com/yourcoopwater',
            display: 'facebook.com/yourcoopwater',
        },
        image: {
            src: '/images/aqua-bope.png',
            alt: 'Water Refilling Service',
        },
    },
    certifications: [
        { src: '/images/logo-rpdh.png', alt: 'RPHD logo' },
        { src: '/images/logo-fda-ph.png', alt: 'FDA Philippines logo' },
    ],
    cta: {
        heading: 'Order Your Water Today',
        description: 'Contact us for orders and delivery inquiries.',
        link: '/contact',
        label: 'Contact Us',
    },
};
