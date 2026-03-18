import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function LoanCTASection() {
    return (
        <section className="bg-gradient-to-r from-brand-navy to-brand-blue py-14">
            <div className="mx-auto max-w-7xl px-4 text-center">
                <h2 className="mb-4 text-2xl font-bold text-white">Ready to Apply for a Loan?</h2>
                <p className="mx-auto mb-6 max-w-xl text-white/80">
                    Download the loan application form and visit our office to start the process.
                </p>
                <Link
                    href="/downloads"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-teal px-7 py-3 font-semibold text-white transition hover:bg-brand-teal-dark"
                >
                    Download Application Form <ArrowRight size={16} />
                </Link>
            </div>
        </section>
    );
}
