import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function SavingsCTASection() {
    return (
        <section className="bg-gradient-to-r from-brand-navy to-brand-blue py-14">
            <div className="mx-auto max-w-7xl px-4 text-center">
                <h2 className="mb-4 text-2xl font-bold text-white">Start Growing Your Savings Today</h2>
                <p className="mx-auto mb-6 max-w-xl text-white/80">
                    Visit our office or contact us to open your savings account.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-teal px-7 py-3 font-semibold text-white transition hover:bg-brand-teal-dark"
                >
                    Get Started <ArrowRight size={16} />
                </Link>
            </div>
        </section>
    );
}
