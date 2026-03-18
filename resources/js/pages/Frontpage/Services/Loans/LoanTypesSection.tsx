import {
    HandCoins,
    Laptop,
    Briefcase,
    Home,
    RefreshCw,
    CloudRain,
    Star,
    DollarSign,
    Clock,
    AlertCircle,
    BookOpen,
    CreditCard,
    ShoppingCart,
    PieChart,
    Gift,
    Hospital,
    Calendar,
    Trophy,
    Medal,
} from 'lucide-react';
import { loanCategories } from '../../_data/loans.data';

export default function LoanTypesSection() {
    // map a loan type string to an icon component
    const iconForType = (type: string) => {
        const t = type.toLowerCase();
        if (t.includes('laptop')) return Laptop;
        if (t.includes('livelihood')) return Briefcase;
        if (t.includes('redemption')) return RefreshCw;
        if (t.includes('calamity')) return CloudRain;
        if (t.includes('house')) return Home;
        if (t.includes('special')) return Star;
        if (t.includes('petty')) return DollarSign;
        if (t.includes('urgent')) return Clock;
        if (t.includes('emergency')) return AlertCircle;
        if (t.includes('eskwela')) return BookOpen;
        if (t.includes('cash advance')) return CreditCard;
        if (t.includes('grocery')) return ShoppingCart;
        if (t.includes('dividend')) return PieChart;
        if (t.includes('occasion')) return Gift;
        if (t.includes('hospital')) return Hospital;
        if (t.includes('bonus')) return Calendar;
        if (t.includes('performance')) return Trophy;
        if (t.includes('loyalty')) return Medal;
        // default
        return HandCoins;
    };

    return (
        <section className="bg-card py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-foreground">Available Loan Types</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                </div>
                <div className="mx-auto max-w-4xl space-y-10">
                    {loanCategories.map((cat) => (
                        <div key={cat.label}>
                            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
                                <HandCoins size={20} className="text-brand-teal" />
                                {cat.label}
                                <span className="ml-1 text-sm font-normal text-muted-foreground">
                                    ({cat.types.length} types)
                                </span>
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {cat.types.map((type) => {
                                    const Icon = iconForType(type);
                                    return (
                                        <div
                                            key={type}
                                            className="flex items-center gap-3 rounded-xl bg-brand-border/20 p-5 transition-all hover:bg-brand-navy/5 hover:shadow-md"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-white">
                                                <Icon size={20} />
                                            </div>
                                            <span className="font-semibold text-foreground">{type}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

