import type { ServiceDetailPageData } from '../Services/ServiceDetailPage';

export const hostelData: ServiceDetailPageData = {
    hero: {
        title: 'Hostel Service',
        subtitle: 'Your Safe, Affordable, Friendly And Relaxing Inn',
    },
    content: {
        imagePosition: 'right',
        heading: 'Cooperative Hostel',
        description:
            'Our hostel offers 15 rooms with panoramic windows, natural daylight and free wireless internet connection. Well-equipped with comfortable seating and individual climate control, the spaces can accommodate a maximum of 50 delegates.',
        location:
            '3rd Level, Cooperative Building, Main Street, City.',
        facebook: {
            url: 'https://www.facebook.com/yourcoophostel',
            display: 'facebook.com/yourcoophostel',
        },
        email: 'hostel@example.com',
        image: {
            src: '/images/safari-bope.webp',
            alt: 'Hostel Service',
        },
    },
    cta: {
        heading: 'Interested in Booking?',
        description: 'Contact us for room availability and rates.',
        link: '/contact',
        label: 'Contact Us',
    },
};
