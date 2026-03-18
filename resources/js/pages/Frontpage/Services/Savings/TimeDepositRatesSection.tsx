import { tieredRates, ksoTrustFundRates } from '../../_data/savings.data';

export default function TimeDepositRatesSection() {

    return (
        <section className="bg-brand-surface py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-foreground">Time Deposit Interest Rates</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {/* TIME DEPOSIT */}
                    <div className="rounded-xl bg-card p-6 shadow-md">
                        <h3 className="mb-1 text-lg font-bold text-foreground">Time Deposit</h3>
                        <p className="mb-4 text-xs text-muted-foreground">Minimum of ₱31,000.00 to earn interest</p>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-brand-navy text-white">
                                    <th className="rounded-tl px-3 py-2 text-left font-semibold">From</th>
                                    <th className="px-3 py-2 text-left font-semibold">To</th>
                                    <th className="rounded-tr px-3 py-2 text-right font-semibold">Rates P.A.</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border/50">
                                {tieredRates.map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-brand-surface'}>
                                        <td className="px-3 py-2 text-foreground">{row.from}</td>
                                        <td className="px-3 py-2 text-foreground">{row.to}</td>
                                        <td className="px-3 py-2 text-right font-semibold text-brand-teal">{row.rate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* KSO TIME DEPOSIT */}
                    <div className="rounded-xl bg-card p-6 shadow-md">
                        <h3 className="mb-1 text-lg font-bold text-foreground">KSO Time Deposit</h3>
                        <p className="mb-4 text-xs text-muted-foreground">Minimum of ₱2,000.00 to earn interest</p>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-brand-navy text-white">
                                    <th className="rounded-tl px-3 py-2 text-left font-semibold">From</th>
                                    <th className="px-3 py-2 text-left font-semibold">To</th>
                                    <th className="rounded-tr px-3 py-2 text-right font-semibold">Rates P.A.</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border/50">
                                {tieredRates.map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-brand-surface'}>
                                        <td className="px-3 py-2 text-foreground">{row.from}</td>
                                        <td className="px-3 py-2 text-foreground">{row.to}</td>
                                        <td className="px-3 py-2 text-right font-semibold text-brand-teal">{row.rate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* KSO TRUST FUND */}
                    <div className="rounded-xl bg-card p-6 shadow-md">
                        <h3 className="mb-1 text-lg font-bold text-foreground">KSO Trust Fund</h3>
                        <p className="mb-4 text-xs text-muted-foreground">Interest earned the first 2 years</p>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-brand-navy text-white">
                                    <th className="rounded-tl px-3 py-2 text-left font-semibold">Requirement to Earn</th>
                                    <th className="rounded-tr px-3 py-2 text-right font-semibold">Rates P.A.</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border/50">
                                {ksoTrustFundRates.map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-brand-surface'}>
                                        <td className="px-3 py-2 text-foreground">{row.req}</td>
                                        <td className="px-3 py-2 text-right font-semibold text-brand-teal">{row.rate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

