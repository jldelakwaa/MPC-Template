import type { LucideIcon } from 'lucide-react';
import { PiggyBank, Clock, TrendingUp } from 'lucide-react';

// ─── Savings Products ───────────────────────────────────────────────────────

export interface SavingsProduct {
    icon: LucideIcon;
    title: string;
    desc: string;
    features: string[];
}

export const savingsProducts: SavingsProduct[] = [
    {
        icon: PiggyBank,
        title: 'Savings Deposit',
        desc: 'Build your savings steadily with a minimum of ₱2,750.00 to earn interest. Deposit build-up through direct placement or salary deduction.',
        features: [
            'Minimum ₱2,750.00 to earn interest',
            'Interest Rate: 1.5% P.A.',
            'Direct placement or salary deduction',
        ],
    },
    {
        icon: Clock,
        title: 'Time Deposit',
        desc: 'Earn higher returns by locking in funds for a fixed term. Available as TIME DEPOSIT, KSO TIME DEPOSIT, and KSO TRUST FUND products.',
        features: [
            'TIME DEPOSIT, KSO TD & KSO Trust Fund',
            'Tiered rates from 2% to 4% P.A.',
            'Guaranteed fixed-term returns',
        ],
    },
    {
        icon: TrendingUp,
        title: 'Share Capital',
        desc: 'Build ownership in the cooperative and earn dividends from annual profits.',
        features: ['Dividend earnings', 'Voting rights', 'Loan multiplier'],
    },
];

// ─── Time Deposit Rates ──────────────────────────────────────────────────────

export interface TieredRate {
    from: string;
    to: string;
    rate: string;
}

/** Shared tiered rates — used by Time Deposit and KSO Time Deposit */
export const tieredRates: TieredRate[] = [
    { from: '₱31,000.00', to: '₱50,000.00', rate: '2%' },
    { from: '₱51,000.00', to: '₱500,000.00', rate: '3%' },
    { from: '₱501,000.00', to: 'Up', rate: '4%' },
];

export interface KsoTrustFundRate {
    req: string;
    rate: string;
}

export const ksoTrustFundRates: KsoTrustFundRate[] = [
    { req: 'First 2 years', rate: '3%' },
    { req: 'Succeeding years', rate: '4%' },
];

// ─── Pre-Termination Rules ───────────────────────────────────────────────────

export const preTerminationRules: string[] = [
    'Give a 30-day notice and present the Certificate of Time Deposit, subject to approval by the Board of Directors.',
    'If withdrawn before the maturity date, the rates for savings deposit will apply.',
    'After maturity, the rate for savings deposit will apply if not renewed on the due date.',
    'The depositor may advise the cooperative to automatically renew the time deposit upon maturity at prevailing interest rates.',
];

// ─── Share Capital ───────────────────────────────────────────────────────────

export const regularMemberShareCapital: string[] = [
    'Subscribed at least Two Hundred (200) common shares.',
    'Paid the required minimum share capital amounting to Fifty Thousand Pesos (₱50,000.00) and membership fee of Three Hundred Pesos (₱300.00).',
];

export const associateMemberShareCapital: string[] = [
    'Subscribed at least One Hundred (100) common shares.',
    'Paid at least 25 shares amounting to Twenty Five Thousand Pesos (₱25,000.00) and membership fee of Three Hundred Pesos (₱300.00).',
];

export const cbuItems: string[] = [
    'At least 50% of Interest on Capital',
    'At least 10% of the Patronage Refund',
    'Monthly contribution through payroll deduction as determined by the Board and approved by the General Assembly',
    'CBU retentions from loan services availed',
];

// ─── Withdrawal & Deposit Policy ─────────────────────────────────────────────

export interface AuthorizationLimit {
    label: string;
    value: string;
}

export const authorizationLimits: AuthorizationLimit[] = [
    { label: 'Teller / Cashier', value: '₱50,000 and below' },
    { label: 'Manager', value: 'Above ₱50,000' },
];

export const cashCheckRelease: AuthorizationLimit[] = [
    { label: 'Cash Release', value: '₱50,000 and below' },
    { label: 'Check Release', value: 'Above ₱50,000' },
];

export const withdrawalRules: string[] = [
    'All withdrawals must be made by the depositor personally using a properly filled-up withdrawal slip.',
    'Authorized representatives must present an identification card. If the withdrawal amount is large, extra care should be taken by confirming the withdrawal with the depositor by phone if possible.',
    'Withdrawal of a sum smaller than One Hundred Pesos (₱100.00) is not permitted, nor withdrawal of a fractional part of a peso, except when closing the account.',
];
