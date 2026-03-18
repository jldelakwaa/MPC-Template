import type { ServiceDetailPageData } from '../Services/ServiceDetailPage';

export const commercialBuildingData: ServiceDetailPageData = {
    hero: {
        title: 'Commercial Building',
        subtitle: 'Rentable Office & Commercial Spaces',
    },
    content: {
        imagePosition: 'right',
        heading: 'Bohol Provincial Employees (BOPE)',
        locations: [
            {
                name: 'Main Branch',
                description:
                    'Rentable Office Spaces @ Poblacion 3 and San Isidro district, Tagbilaran City',
            },
        ],
        facebook: {
            url: 'https://www.facebook.com/bopempcoop/',
            display: 'facebook.com/bopempcoop',
        },
        email: 'bopempc@gmail.com',
        description: 'Looking for a place to stay in the heart of Tagbilaran City?\nBook your stay with us',
        image: {
            src: '/images/commercial-building-bope.png',
            alt: 'Commercial Building',
        },
    },
    cta: {
        heading: 'Interested in Renting?',
        description: 'Contact us for available spaces and rental rates.',
        link: '/contact',
        label: 'Inquire Now',
    },
};
