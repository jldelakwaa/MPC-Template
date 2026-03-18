import { loanMonitoringPoints } from '../../_data/loans.data';

export default function LoanMonitoringSection() {
    return (
        <section className="bg-card py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-foreground">Loan Monitoring</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                </div>
                <div className="mx-auto max-w-4xl rounded-xl bg-brand-border/20 p-8">
                    <ol className="space-y-4">
                        {loanMonitoringPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-4 text-sm leading-relaxed text-foreground/80">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white">
                                    {i + 1}
                                </span>
                                {point}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}

