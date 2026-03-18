import { savingsProducts } from '../../_data/savings.data';
import { CheckCircle } from 'lucide-react';

export default function SavingsProductsSection() {
    return (
        <section className="bg-card py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-foreground">Savings Products</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {savingsProducts.map((product) => (
                        <div key={product.title} className="rounded-2xl border border-border/60 bg-card p-8 shadow-md transition-all hover:shadow-lg">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy/10 text-foreground">
                                <product.icon size={28} />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-foreground">{product.title}</h3>
                            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{product.desc}</p>
                            <ul className="space-y-2">
                                {product.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                                        <CheckCircle size={14} className="text-brand-teal" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

