import { CheckCircle } from 'lucide-react';
import { authorizationLimits, cashCheckRelease, withdrawalRules } from '../../_data/savings.data';

export default function WithdrawalPolicySection() {
    return (
        <section className="bg-card py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-foreground">Withdrawal & Deposit Policy</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                </div>

                {/* Authorization Limits */}
                <div className="mx-auto mb-3 max-w-3xl">
                    <h3 className="text-base font-semibold text-foreground">Authorization Limits</h3>
                </div>
                <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
                    {authorizationLimits.map((item) => (
                        <div key={item.label} className="flex items-center justify-between rounded-lg bg-brand-surface p-5 shadow-sm">
                            <span className="font-medium text-foreground">{item.label}</span>
                            <span className="text-sm font-semibold text-brand-teal">{item.value}</span>
                        </div>
                    ))}
                </div>
                <p className="mx-auto mt-2 max-w-3xl text-xs text-muted-foreground">
                    Approval limits may be changed from time to time.
                </p>

                {/* Cash / Check Release */}
                <div className="mx-auto mb-3 mt-8 max-w-3xl">
                    <h3 className="text-base font-semibold text-foreground">Cash / Check Release</h3>
                </div>
                <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
                    {cashCheckRelease.map((item) => (
                        <div key={item.label} className="flex items-center justify-between rounded-lg bg-brand-surface p-5 shadow-sm">
                            <span className="font-medium text-foreground">{item.label}</span>
                            <span className="text-sm font-semibold text-brand-teal">{item.value}</span>
                        </div>
                    ))}
                </div>

                {/* Withdrawal Rules */}
                <div className="mx-auto mt-8 max-w-3xl rounded-xl bg-brand-surface p-6 shadow-sm">
                    <h3 className="mb-4 text-base font-semibold text-foreground">Withdrawal Rules</h3>
                    <ul className="space-y-3">
                        {withdrawalRules.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                <CheckCircle size={16} className="mt-0.5 shrink-0 text-brand-teal" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

