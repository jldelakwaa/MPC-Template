import { Clock } from 'lucide-react';
import { renewalSchedule } from '../../_data/loans.data';

export default function LoanRenewalSection() {
    return (
        <>
            {/* Loan Renewal */}
            <section className="bg-card py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-foreground">Loan Renewal</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                    </div>
                    <div className="mx-auto max-w-4xl rounded-xl bg-brand-border/20 p-8">
                        <div className="mb-5 flex items-start gap-3">
                            <Clock size={22} className="mt-0.5 shrink-0 text-foreground" />
                            <p className="text-sm leading-relaxed text-foreground/80">
                                Loan renewal may be allowed as provided below. However, no member is allowed to renew
                                if he/she is delinquent in any of his/her loan accounts.
                            </p>
                        </div>
                        <div className="overflow-hidden rounded-lg border border-border/60">
                            <table className="w-full text-sm">
                                <thead className="bg-brand-navy text-white">
                                    <tr>
                                        <th className="px-5 py-3 text-left font-semibold">Loan Type</th>
                                        <th className="px-5 py-3 text-right font-semibold">May Be Renewed After</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border/40 bg-card">
                                    {renewalSchedule.map((item) => (
                                        <tr key={item.type}>
                                            <td className="px-5 py-3 text-foreground">{item.type}</td>
                                            <td className="px-5 py-3 text-right font-semibold text-brand-teal">
                                                {item.after}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


