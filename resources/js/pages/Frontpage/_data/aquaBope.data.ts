import type { ServiceDetailPageData } from '../Services/ServiceDetailPage';

export const aquaBopeData: ServiceDetailPageData = {
    hero: {
        title: 'Aqua Bope',
        subtitle: 'For your safe drinking water',
    },
    content: {
        imagePosition: 'left',
        heading: 'AQUA BOPE',
        description:
            "AQUA BOPE is BOPE-MPC's Water Refilling Station. Technologically equipped with 21 Stages of Water Purification System to serve our consumers with quality and safe drinking water.",
        location:
            'At Ground Floor, BOPE-MPC Annex Building, 0149-A F. Rocha St., Poblacion III, Tagbilaran City, Bohol.',
        facebook: {
            url: 'https://www.facebook.com/aquabopempc',
            display: 'facebook.com/aquabopempc',
        },
        image: {
            src: '/images/aqua-bope.png',
            alt: 'Aqua Bope',
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
