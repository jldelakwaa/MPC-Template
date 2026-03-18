import { loanCharges } from '../../_data/loans.data';

export default function LoanChargesSection() {
    const charges = loanCharges;

    return (
        <section className="bg-brand-surface py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-foreground">Loan Charges &amp; Interest</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                </div>
                <div className="mx-auto max-w-4xl space-y-4">
                    {charges.map((charge) => (
                        <div key={charge.number} className="rounded-xl bg-card p-6 shadow-sm">
                            <h3 className="mb-2 flex items-center gap-2 font-bold text-foreground">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white">
                                    {charge.number}
                                </span>
                                {charge.title}
                            </h3>
                            {'detail' in charge && (
                                <p className="ml-9 text-sm leading-relaxed text-muted-foreground">{charge.detail}</p>
                            )}
                            {'rows' in charge && charge.rows && (
                                <div className="ml-9 mt-2 divide-y divide-brand-border/40 rounded-lg border border-border/40">
                                    {charge.rows.map((row) => (
                                        <div
                                            key={row.label}
                                            className="flex items-center justify-between px-4 py-2 text-sm"
                                        >
                                            <span className="text-foreground">{row.label}</span>
                                            <span className="shrink-0 font-semibold text-brand-teal">{row.value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


