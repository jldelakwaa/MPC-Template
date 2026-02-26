import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import {
    HandCoins,
    FileText,
    Users,
    AlertCircle,
    CheckCircle,
    Calculator,
    Clock,
    Shield,
    ArrowRight,
    ChevronDown,
} from 'lucide-react';
import { useState } from 'react';

const loanTypes = [
    'Regular Loan',
    'Gadget Loan',
    'Redemption Loan',
    'House Improvement Loan',
    'Livelihood Loan',
    'Special Loan',
    'Petty Cash Loan',
    'Urgent Loan',
    'Emergency Loan',
    'Grocery Loan',
    'Special Occasion Loan',
];

const requirements = [
    'Application Form',
    'Promissory Note',
    'Pay Slip / Proof of Income',
    'Deed of Loan Collection Agreement (if applicable)',
    'Affidavit of Undertaking for ATM-secured loan',
    'Contract of Employment / Appointment',
    'Co-maker\'s Commitment',
    'Certification of Leave Credits',
    'Certification from PACCO (unliquidated cash advances)',
    'Post-Dated Checks',
    'TCT/OCT/OR/CR of Real Property (if applicable)',
    'Credit Investigation & Appraisal Report',
    'Latest Tax Declaration',
    'Tax Clearance',
    'Bank Statements',
    'Barangay Clearance',
    'Statement of Accounts',
    'CIC Credit Standing',
    'Updated Business Permits (if applicable)',
];

export default function Loans() {
    const [openSection, setOpenSection] = useState<string | null>('evaluation');

    const toggle = (section: string) =>
        setOpenSection(openSection === section ? null : section);

    return (
        <FrontLayout title="Loans">
            {/* Hero Banner */}
            <section className="bg-gradient-to-br from-[#1B3A6B] via-[#4A7AAC]/50 to-[#2E6B6B]/50 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-[#F0F4F8]">Loan Products</h1>
                    <p className="mt-3 text-lg text-[#F0F4F8]/70">
                        Flexible financing solutions tailored to your needs
                    </p>
                    <div className="mx-auto mt-3 h-1 w-16 rounded bg-[#2E6B6B]" />
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="bg-[#D6D8DC]/30">
                <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-[#2C2C2C]/60">
                    <Link href="/" className="hover:text-[#1B3A6B]">Home</Link>
                    <span>/</span>
                    <Link href="#" className="hover:text-[#1B3A6B]">Products & Services</Link>
                    <span>/</span>
                    <span className="font-medium text-[#1B3A6B]">Loans</span>
                </div>
            </div>

            {/* Loan Types */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-[#1B3A6B]">Available Loan Types</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-[#2E6B6B]" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {loanTypes.map((type) => (
                            <div
                                key={type}
                                className="flex items-center gap-3 rounded-xl bg-[#D6D8DC]/20 p-5 transition-all hover:bg-[#1B3A6B]/5 hover:shadow-md"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1B3A6B] text-white">
                                    <HandCoins size={20} />
                                </div>
                                <span className="font-semibold text-[#1B3A6B]">{type}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who Can Borrow */}
            <section className="bg-[#f7f8fa] py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-[#1B3A6B]">Who Can Borrow?</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-[#2E6B6B]" />
                        <p className="mx-auto mt-4 max-w-2xl text-[#2C2C2C]/70">
                            Regular and associate members may avail of a loan, provided they are
                            members in good standing. All applications are subject to the cooperative's
                            Credit Evaluation Policy.
                        </p>
                    </div>

                    {/* Credit Evaluation Accordion */}
                    <div className="mx-auto max-w-4xl space-y-3">
                        {[
                            {
                                id: 'evaluation',
                                icon: Shield,
                                title: 'Character',
                                content:
                                    'Members must have good credit standing with other financing institutions. No delinquent or past-due accounts on any existing cooperative loan. New members with no credit history may only be approved for smaller amounts and shorter terms.',
                            },
                            {
                                id: 'capacity',
                                icon: Calculator,
                                title: 'Capacity',
                                content:
                                    'Borrowers must have a net monthly take-home pay of not less than ₱5,000 after deduction of the proposed loan amortization. If income falls below ₱5,000, the applicant must entrust their payroll ATM as payment source.',
                            },
                            {
                                id: 'capital',
                                icon: HandCoins,
                                title: 'Capital',
                                content:
                                    'Maximum loanable amount is 6 times the member\'s paid-up share capital. The required PUSC may be deducted from the loan if the borrower falls short.',
                            },
                            {
                                id: 'collateral',
                                icon: FileText,
                                title: 'Collateral',
                                content:
                                    'Accepted collateral includes: member\'s share capital, member\'s deposit, co-maker\'s share capital/deposit, vehicles owned by the member, and land & buildings with clear title.',
                            },
                            {
                                id: 'comaker',
                                icon: Users,
                                title: 'Co-Maker Requirements',
                                content:
                                    'Co-makers must be: members in good standing, regular members with net income above ₱5,000/month, below 65 years of age at loan maturity, and with minimum PUSC of ₱7,000. Officers, staff (except for co-worker loans), members 65+, and those with past-due accounts are not eligible.',
                            },
                        ].map((item) => (
                            <div
                                key={item.id}
                                className="overflow-hidden rounded-xl bg-white shadow-sm"
                            >
                                <button
                                    onClick={() => toggle(item.id)}
                                    className="flex w-full items-center justify-between p-5 text-left transition hover:bg-[#D6D8DC]/20"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2E6B6B]/10 text-[#2E6B6B]">
                                            <item.icon size={20} />
                                        </div>
                                        <span className="text-lg font-semibold text-[#1B3A6B]">{item.title}</span>
                                    </div>
                                    <ChevronDown
                                        size={20}
                                        className={`text-[#2C2C2C]/40 transition-transform ${openSection === item.id ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {openSection === item.id && (
                                    <div className="border-t border-[#D6D8DC]/40 px-5 py-4">
                                        <p className="leading-relaxed text-[#2C2C2C]/70">{item.content}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Requirements */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-[#1B3A6B]">Loan Requirements</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-[#2E6B6B]" />
                    </div>
                    <div className="mx-auto max-w-4xl">
                        <div className="rounded-xl bg-[#D6D8DC]/20 p-8">
                            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#1B3A6B]">
                                <FileText size={20} /> Basic & Additional Requirements
                            </h3>
                            <div className="grid gap-2 sm:grid-cols-2">
                                {requirements.map((req, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-[#2C2C2C]">
                                        <CheckCircle size={14} className="mt-0.5 shrink-0 text-[#2E6B6B]" />
                                        {req}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Charges & Interest */}
            <section className="bg-[#f7f8fa] py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-[#1B3A6B]">Loan Charges & Interest</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-[#2E6B6B]" />
                    </div>
                    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
                        {[
                            { label: 'Service Fee', value: '2% of loan proceeds' },
                            { label: 'Notarial Fee', value: '₱100 (if required)' },
                            { label: 'Processing Fee', value: '₱200 (short-term) / ₱300 (long-term)' },
                            { label: 'Short-term Interest', value: '1.5%/month, diminishing' },
                            { label: 'Livelihood Interest', value: '10%/annum (0.83%/month), fixed' },
                            { label: 'Long-term Interest', value: '1.5%/month, diminishing' },
                            { label: 'Calamity Interest', value: '10%/annum (0.83%/month), fixed' },
                            { label: 'Additional Interest', value: '1.5% on principal (matured loans)' },
                            { label: 'Penalty', value: '2%/month on amortization due' },
                            { label: 'Default Fee', value: '5%/month after 3-month non-payment' },
                        ].map((charge) => (
                            <div
                                key={charge.label}
                                className="flex items-center justify-between rounded-lg bg-white px-5 py-4 shadow-sm"
                            >
                                <span className="font-medium text-[#1B3A6B]">{charge.label}</span>
                                <span className="text-sm font-semibold text-[#2E6B6B]">{charge.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Renewal & Important Notes */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Renewal */}
                        <div className="rounded-xl bg-[#D6D8DC]/20 p-8">
                            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#1B3A6B]">
                                <Clock size={22} /> Loan Renewal
                            </h3>
                            <p className="mb-4 text-sm text-[#2C2C2C]/70">
                                No member may renew if delinquent in any loan account.
                            </p>
                            <div className="space-y-2">
                                {[
                                    { type: 'Regular, Gadget, Redemption, House Improvement', after: '6 monthly payments' },
                                    { type: 'Special Loan', after: '12 monthly payments' },
                                    { type: 'Petty Cash, Urgent, Emergency, Grocery, Special Occasion', after: '5 monthly payments' },
                                ].map((item) => (
                                    <div key={item.type} className="flex items-start justify-between gap-4 rounded-lg bg-white p-3 text-sm">
                                        <span className="text-[#2C2C2C]">{item.type}</span>
                                        <span className="shrink-0 font-semibold text-[#2E6B6B]">{item.after}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cooling Off */}
                        <div className="rounded-xl bg-[#1B3A6B]/5 p-8">
                            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#1B3A6B]">
                                <AlertCircle size={22} /> Cooling-Off Period
                            </h3>
                            <p className="mb-4 text-sm leading-relaxed text-[#2C2C2C]/70">
                                A maximum of <strong>3 calendar days</strong> cooling-off period after signing any loan agreement.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    'Begins the day after agreement is signed',
                                    'Member may withdraw via written notice',
                                    'No fees or penalties if cancelled within period',
                                    'Advance payments refunded within 10 working days',
                                    'Does not apply if funds have been disbursed',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-[#2C2C2C]/70">
                                        <CheckCircle size={14} className="mt-0.5 shrink-0 text-[#2E6B6B]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-[#1B3A6B] to-[#4A7AAC] py-14">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-white">Ready to Apply for a Loan?</h2>
                    <p className="mx-auto mb-6 max-w-xl text-white/80">
                        Download the loan application form and visit our office to start the process.
                    </p>
                    <Link
                        href="/downloads"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#2E6B6B] px-7 py-3 font-semibold text-white transition hover:bg-[#245858]"
                    >
                        Download Application Form <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </FrontLayout>
    );
}
