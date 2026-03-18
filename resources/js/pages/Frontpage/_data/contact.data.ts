export interface MapAddress {
    name: string;
    address: string;
}

export interface ContactInfo {
    address: string;
    mapAddresses?: MapAddress[]; // one or more locations for the map
    telephone: { label: string; number: string }[];
    mobile: { label: string; number: string }[];
    email: string;
    officeHours: string;
    facebookUrl: string;
}

export const contactInfo: ContactInfo = {
    address: 'Cooperative Building,\nYour Address Here',
    telephone: [
        { label: 'Admin Office', number: '(038) 500-1499' },
    ],
    mobile: [
        { label: 'Admin Office', number: '0930 - 428 - 1464' },
        { label: 'Water Refilling Service', number: '0994 - 537 - 7547' },
        { label: 'SAFARI', number: '0970 - 774 - 9123' },
    ],
    email: 'info@example.com',
    officeHours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    facebookUrl: 'https://www.facebook.com/yourcoop',
    mapAddresses: [
        {
            name: 'Sample Multi-Purpose Cooperative',
            address: 'Main Street, City, Province, ZIP',
        },
    ],
};
