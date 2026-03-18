import { AlertCircle, CheckCircle } from 'lucide-react';

interface Condition {
    id: string;
    content: React.ReactNode;
    className?: string;
}

const conditions: Condition[] = [
    {
        id: 'start-date',
        content: (
            <span>The cooling-off period begins the day after the agreement is signed.</span>
        ),
    },
    {
        id: 'withdrawal',
        content: (
            <span>
                During this period, the member/applicant may withdraw from the agreement by
                submitting a <strong>written notice of cancellation</strong> to the Cooperative.
            </span>
        ),
    },
    {
        id: 'no-fees',
        content: (
            <span>
                No fees or penalties shall be charged if the cancellation occurs within the
                cooling-off period.
            </span>
        ),
    },
    {
        id: 'refund',
        content: (
            <span>
                If any amount was paid in advance, it shall be 
                <strong> refunded in full within 10 working days</strong> from receipt of the
                cancellation notice.
            </span>
        ),
    },
    {
        id: 'warning',
        content: (
            <span>
                If any services have already been availed or funds disbursed, the cooling-off
                policy <strong>may not apply</strong>.
            </span>
        ),
    },
];

function ConditionsList({ items }: { items: Condition[] }) {
    return (
        <div className="space-y-2">
            {items.map(({ id, content, className }) => (
                <div
                    key={id}
                    className={
                        `flex items-start gap-2 text-sm text-foreground/80` +
                        (className ? ` ${className}` : '')
                    }
                >
                    <CheckCircle size={14} className="mt-0.5 shrink-0 text-brand-teal" />
                    {content}
                </div>
            ))}
        </div>
    );
}

export default function CoolingOffSection() {
    return (
        <section className="bg-brand-surface py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-foreground">Cooling-Off Period</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                </div>
                <div className="mx-auto max-w-4xl space-y-6">
                    <div className="rounded-xl bg-card p-8 shadow-sm">
                        <div className="mb-5 flex items-start gap-3">
                            <AlertCircle size={22} className="mt-0.5 shrink-0 text-brand-teal" />
                            <p className="text-sm leading-relaxed text-foreground/80">
                                To uphold transparency and protect members from undue pressure or premature
                                decisions, the Cooperative shall grant a maximum{' '}
                                <strong>three (3) calendar day cooling-off period</strong> after signing of:
                            </p>
                        </div>
                        <ul className="mb-6 ml-9 space-y-1 text-sm text-foreground/80">
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                                Membership Agreement
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                                Any Loan Agreement
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                                Any Service Contract with financial implications
                            </li>
                        </ul>
                        <p className="mb-3 text-sm font-semibold text-foreground">Conditions:</p>
                        <ConditionsList items={conditions} />
                    </div>
                </div>
            </div>
        </section>
    );
}

