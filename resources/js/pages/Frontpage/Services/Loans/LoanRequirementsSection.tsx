import { CheckCircle, FileText } from 'lucide-react';
import { basicRequirements, otherRequirements } from '../../_data/loans.data';

export default function LoanRequirementsSection() {
    return (
        <section className="bg-card py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-foreground">Loan Requirements</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                </div>
                <div className="mx-auto max-w-4xl space-y-6">
                    {/* Basic Requirements */}
                    <div className="rounded-xl bg-brand-border/20 p-8">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                            <FileText size={20} /> Basic Requirements
                        </h3>
                        <div className="space-y-2">
                            {basicRequirements.map((req, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm text-foreground">
                                    <CheckCircle size={14} className="mt-0.5 shrink-0 text-brand-teal" />
                                    {req}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Other Requirements */}
                    <div className="rounded-xl bg-brand-navy/5 p-8">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                            <FileText size={20} /> Other Requirements Deemed Necessary
                        </h3>
                        <div className="grid gap-2 sm:grid-cols-2">
                            {otherRequirements.map((req, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm text-foreground">
                                    <CheckCircle size={14} className="mt-0.5 shrink-0 text-brand-teal" />
                                    {req}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

