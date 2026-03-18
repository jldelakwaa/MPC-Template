import { Clock, CheckCircle } from 'lucide-react';
import { preTerminationRules } from '../../_data/savings.data';

export default function PreTerminationSection() {
    return (
        <section className="bg-card py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mx-auto max-w-4xl rounded-xl bg-card p-8 shadow-md border border-border/60">
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
                        <Clock size={22} /> Time Deposit Pre-Termination
                    </h3>
                    <ul className="space-y-3">
                        {preTerminationRules.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-muted-foreground">
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

