import type { LucideIcon } from 'lucide-react';
import { FileText, GraduationCap, BadgeCheck } from 'lucide-react';

export const regularRequirements: string[] = [
    'Permanent employee of the organization',
    'Completed the Pre-Membership Education Seminar (PMES)',
    'Good moral standing in the community',
    'Subscribed the required shares payable within 10 years',
    'Paid minimum required shares within 1 year',
    'Permanent employees of the cooperative',
    'Separated employees who are regular members',
];

export const associateRequirements: string[] = [
    'Gainfully employed (does not qualify as regular member)',
    'Completed the Pre-Membership Education Seminar (PMES)',
    'Good moral standing in the community',
    'Subscribed the required shares payable within 10 years',
    'Paid the minimum required shares within 1 year',
];

export interface HowToJoinStep {
    step: string;
    icon: LucideIcon;
    title: string;
    desc: string;
}

export const howToJoinSteps: HowToJoinStep[] = [
    {
        step: '01',
        icon: FileText,
        title: 'Sign Up',
        desc: 'Fill up the Membership Application and Subscription Agreement (MASA) Form and express your intention to join.',
    },
    {
        step: '02',
        icon: GraduationCap,
        title: 'Attend PMES',
        desc: 'Attend and complete the Pre-Membership Education Seminar scheduled by the Education & Training Committee.',
    },
    {
        step: '03',
        icon: FileText,
        title: 'Submit Application',
        desc: 'Complete the registration form, pay at least 1 share (₱1,000) and membership fee (₱300).',
    },
    {
        step: '04',
        icon: BadgeCheck,
        title: 'Get Approved',
        desc: 'The Education Committee Chairperson and Board Chairperson will provisionally approve your application.',
    },
];
