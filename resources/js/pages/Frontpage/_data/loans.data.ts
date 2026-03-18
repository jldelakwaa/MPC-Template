// ─── Loan Categories ─────────────────────────────────────────────────────────

export interface LoanCategory {
    label: string;
    types: string[];
}

export const loanCategories: LoanCategory[] = [
    {
        label: 'Long-Term Loans',
        types: [
            'Regular Loans',
            'Laptop Loans',
            'Livelihood Loans',
            'Redemption Loans',
            'Calamity Loans',
            'House Improvement Loans',
            'Special Loans',
        ],
    },
    {
        label: 'Short-Term Loans',
        types: [
            'Petty Cash Loans',
            'Urgent Loans',
            'Emergency Loans',
            'Balik-Eskwela Loans',
            'Cash Advance Loans',
            'Grocery Loans',
            'Dividend Loans',
            'Special Occasion Loans',
            'Hospitalization Loans',
        ],
    },
    {
        label: 'Special Payroll Loans',
        types: [
            'Mid-Year Bonus Loans',
            'Year-End Bonus Loans',
            'CNA Bonus Loans',
            'Performance Bonus Based Loans',
            'Cash Gift Loans',
            'Loyalty Loans',
        ],
    },
];

// ─── Loan Requirements ────────────────────────────────────────────────────────

export const basicRequirements: string[] = [
    'Application Form',
    'Promissory Note',
    'Pay Slip / Proof of Income',
];

export const otherRequirements: string[] = [
    'Deed of Loan Collection Agreement',
    'Affidavit of Undertaking for Loan Secured with ATM Card',
    'Contract of Employment / Appointment',
    "Co-maker's Commitment",
    'Certification of Leave Credits',
    'Certification of Unliquidated Cash Advances from PACCO',
    'Post Dated Checks',
    "Owner's Copy of TCT/OCT/OR/CR of Real Property Tax",
    'Credit Investigation and Appraisal Report',
    'Latest Tax Declaration',
    'Tax Clearance',
    'Bank Statements',
    'Barangay Clearance',
    'Statement of Accounts',
    'Credit Standing from Credit Information Corporation',
    'Updated Business Permits',
];

// ─── Renewal Schedule ────────────────────────────────────────────────────────

export interface RenewalScheduleEntry {
    type: string;
    after: string;
}

export const renewalSchedule: RenewalScheduleEntry[] = [
    { type: 'Regular, Gadget, Redemption, House Improvement', after: '6 monthly payments' },
    { type: 'Special Loan', after: '12 monthly payments' },
    { type: 'Petty Cash, Urgent, Emergency, Grocery, Special Occasion', after: '5 monthly payments' },
];

// ─── Approval Authority ───────────────────────────────────────────────────────

export interface LoanApprovalEntry {
    loanType: string;
    approver: string;
}

export const loanApprovalAuthority: LoanApprovalEntry[] = [
    {
        loanType: 'Regular, Gadget, Redemption, House Improvement, Livelihood',
        approver: 'General Manager',
    },
    {
        loanType: 'Special Loan',
        approver: 'Board of Directors',
    },
    {
        loanType:
            'Short-Term Loans — Petty Cash, Urgent, Emergency, Grocery, Special Occasion, Special Payroll, Dividends, Cash Advance, Balik-Eskwela',
        approver: 'Loan Officer',
    },
];

// ─── Monitoring Points ────────────────────────────────────────────────────────

export const loanMonitoringPoints: string[] = [
    'Loan officer shall have the custody of loan records of the borrowers.',
    'Loan records should be kept in a locked cabinet with controlled access by the loan custodian.',
    "The lending officer shall document and attach to the loan file: the calculation of net take-home/net income, proof of payroll account, signed Letter of Intent/Affidavit (if applicable), and the decision of the BOD if applicable.",
    "Project visits may be conducted by the Loan Officer/Manager to have timely information about the project status. Remedial activity may be taken before the accounts turn past due and should be properly documented and filed in the borrower's folder.",
    'Once the loan is active, the cooperative shall monitor repayments and assess any signs of capacity deterioration (e.g., job loss, salary reduction, increased liabilities). The cooperative reserves the right to impose additional conditions or restructure the loan should capacity materially weaken.',
    'Aging of accounts should be reported by ELECOM quarterly during joint BOD committee meeting.',
];

// ─── Loan Charges ─────────────────────────────────────────────────────────────

export interface LoanChargeRow {
    label: string;
    value: string;
}

export type LoanCharge =
    | { number: number; title: string; detail: string; rows?: never }
    | { number: number; title: string; rows: LoanChargeRow[]; detail?: never };

export const loanCharges: LoanCharge[] = [
    {
        number: 1,
        title: 'Service Fee',
        detail: 'All loans are covered with a 2% service fee deductible from loan proceeds.',
    },
    {
        number: 2,
        title: 'Notarial Fee',
        detail: 'One hundred pesos (₱100) is deducted as notarial fee for loans requiring notarial acknowledgment.',
    },
    {
        number: 3,
        title: 'Insurance Premiums',
        detail: 'All loans are covered by a loan payment protection/insurance program. Computation of insurance premiums is governed by the insurance provider\u2019s rate.',
    },
    {
        number: 4,
        title: 'Processing Fee',
        detail: 'A processing fee of ₱200 shall be charged on all short-term loans and ₱300 for long-term loans, except on loan types requiring a special rate due to additional mandatory processes.',
    },
    {
        number: 5,
        title: 'Interest',
        rows: [
            { label: 'Short-term loans (except Livelihood)', value: '1.5% per month, monthly diminishing' },
            { label: 'Livelihood Loans', value: '10% per annum / 0.83% per month, fixed' },
            { label: 'Long-term loans (except Calamity)', value: '1.5% per month, monthly diminishing' },
            { label: 'Calamity Loan', value: '10% per annum / 0.83% per month, fixed' },
        ],
    },
    {
        number: 6,
        title: 'Additional Interest',
        detail: 'An additional interest of 1.5% on the principal balance is charged for matured loans with existing balance.',
    },
    {
        number: 7,
        title: 'Penalties',
        detail: '2% per month on the amortization due in case of default of payment, or on the principal balance in case of matured loans.',
    },
    {
        number: 8,
        title: 'Default Fee',
        detail:
            'Non-payment or under-payment of monthly installment amortization due for at least three (3) months — and after a grace period of one (1) month — shall be considered due and demandable. A default fee of 5% per month on the principal loan balance will be charged until fully paid.',
    },
];

// ─── Credit Evaluation ────────────────────────────────────────────────────────

export interface TextPart {
    text: string;
    bold?: boolean;
}

export interface ContentParagraph {
    type: 'p';
    parts: TextPart[];
    indent?: boolean;
}

export interface ContentList {
    type: 'ol';
    items: string[];
}

export interface ContentSubsection {
    type: 'subsection';
    heading: string;
    intro?: string;
    list: string[];
}

export type ContentBlock = ContentParagraph | ContentList | ContentSubsection;

export type CreditEvalIconName = 'Shield' | 'Calculator' | 'HandCoins' | 'FileText' | 'Users';

export interface CreditEvalItem {
    id: string;
    iconName: CreditEvalIconName;
    title: string;
    content: ContentBlock[];
}

export const creditEvaluationItems: CreditEvalItem[] = [
    {
        id: 'evaluation',
        iconName: 'Shield',
        title: 'Character',
        content: [
            {
                type: 'p',
                indent: true,
                parts: [
                    {
                        text: 'Regular members who intend to avail of a loan must have a good credit standing with other financing institutions. Loan applicants must have no delinquent or past-due accounts on any existing cooperative loan. Deduction of total arrears may be applied to the amount of the loan applied for, if applicable.',
                    },
                ],
            },
            {
                type: 'p',
                indent: true,
                parts: [
                    {
                        text: 'A new member who has no credit record or history with other financing institutions—or with the Cooperative—must first establish a positive credit record with the Cooperative. Accordingly, the member may only be approved for a loan of smaller amount and for a shorter loan term.',
                    },
                ],
            },
        ],
    },
    {
        id: 'capacity',
        iconName: 'Calculator',
        title: 'Capacity',
        content: [
            {
                type: 'p',
                indent: true,
                parts: [
                    {
                        text: "At all times, a proper evaluation of the borrower's capacity to meet the required debt payments on time shall be strictly followed and implemented. To ensure the borrower has sufficient income or cash flow to service the debt obligation, loan applicants must have a ",
                    },
                    { text: 'net monthly take-home pay or net income of not less than ₱5,000', bold: true },
                    {
                        text: " after deduction of the proposed loan amortization. If, during evaluation, an applicant's net income falls below ₱5,000, then the applicant must entrust his/her payroll ATM as the payment source and submit a duly signed letter of intent or affidavit.",
                    },
                ],
            },
        ],
    },
    {
        id: 'capital',
        iconName: 'HandCoins',
        title: 'Capital',
        content: [
            {
                type: 'p',
                indent: true,
                parts: [
                    {
                        text: "A member loan applicant's maximum loanable amount is 6 times his/her paid-up share capital. The same required Paid Up Share Capital may be deducted from the loan applied if the borrower's PUSC falls short from the required capital.",
                    },
                ],
            },
        ],
    },
    {
        id: 'collateral',
        iconName: 'FileText',
        title: 'Collateral',
        content: [
            {
                type: 'p',
                indent: true,
                parts: [
                    { text: 'Collateral is regarded as a ' },
                    { text: 'secondary source of repayment', bold: true },
                    {
                        text: " or a back-up to the primary source of repayment, which is typically the borrower's income or cash-flow. In the credit assessment, collateral serves as a safety-net for the lender: if the borrower's primary repayment capacity falters, the cooperative has recourse to the pledged asset. The following may be accepted as collateral, taking into consideration the borrower's character, capacity (income/salary), share capital, deposit liabilities, and the prevailing conditions:",
                    },
                ],
            },
            {
                type: 'ol',
                items: [
                    "Member's share capital",
                    "Member's deposit",
                    "Co-maker's share capital",
                    "Co-maker's deposit",
                    'Vehicle – ownership must be under the member\'s name and value must be sufficient to cover payment.',
                    'Land & Building / Real Estate – Must have clear title, marketable value, stable location, and no encumbrances.',
                ],
            },
        ],
    },
    {
        id: 'comaker',
        iconName: 'Users',
        title: 'Co-Maker Requirements',
        content: [
            {
                type: 'p',
                indent: true,
                parts: [
                    {
                        text: 'A "co-maker" is someone who signs a loan contract alongside the principal borrower. By doing so, he/she promises to assume responsibility for the loan if the borrower fails. A co-maker is ',
                    },
                    { text: 'jointly and severally liable', bold: true },
                    {
                        text: ' with the borrower. The cooperative can demand full payment from the co-maker if the borrower defaults.',
                    },
                ],
            },
            {
                type: 'subsection',
                heading: 'Co-maker Eligibility',
                intro: 'For a member to sign as a co-maker, he/she must possess the following:',
                list: [
                    'Member in good standing',
                    'Regular member whose monthly net income does not fall below ₱5,000',
                    'Below 65 years of age upon maturity of loan applied',
                    'Member whose Paid Up Share Capital is at least ₱7,000 (CBU requirement may be increased depending on the loan amount)',
                ],
            },
            {
                type: 'subsection',
                heading: 'Not Eligible to Become a Co-Maker',
                list: [
                    'Appointed and elected officers of the Cooperative',
                    'Cooperative staff, except on loans of a co-worker',
                    '65 years old and above',
                    'Members with past-due account',
                ],
            },
        ],
    },
];
