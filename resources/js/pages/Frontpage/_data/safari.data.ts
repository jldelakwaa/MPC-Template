import type { ServiceDetailPageData } from '../Services/ServiceDetailPage';

export const safariData: ServiceDetailPageData = {
    hero: {
        title: 'Safari Hostel',
        subtitle: 'Your Safe, Affordable, Friendly And Relaxing Inn',
    },
    content: {
        imagePosition: 'right',
        heading: 'BOPE-MPC Safari Hostel',
        description:
            'SAFARI Hostel offers 15 rooms with panoramic windows, natural daylight and free wireless internet connection. Well-equipped with comfortable seating and individual climate control, the spaces can accommodate a maximum of 50 delegates.',
        location:
            'At 3rd level of BOPEMPC Building, 0149-A F. Rocha St., Poblacion III, Tagbilaran City, Bohol.',
        facebook: {
            url: 'https://www.facebook.com/safarihostelbohol',
            display: 'facebook.com/safarihostelbohol',
        },
        email: 'bopempcsafarihostel@gmail.com',
        image: {
            src: '/images/safari-bope.webp',
            alt: 'Safari Hostel',
        },
    },
    cta: {
        heading: 'Interested in Booking?',
        description: 'Contact us for room availability and rates.',
        link: '/contact',
        label: 'Contact Us',
    },
};
