import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import { Link } from '@inertiajs/react';
import { PiggyBank, TrendingUp, Clock, Shield, CheckCircle, ArrowRight } from 'lucide-react';

export default function Savings() {
    return (
        <FrontLayout title="Savings & Deposits">
            {/* Hero Banner */}
            <section className="bg-gradient-to-br from-[#1B3A6B] via-[#4A7AAC]/50 to-[#2E6B6B]/50 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-[#F0F4F8]">Savings & Deposits</h1>
                    <p className="mt-3 text-lg text-[#F0F4F8]/70">
                        Grow your money with competitive interest rates
                    </p>
                    <div className="mx-auto mt-3 h-1 w-16 rounded bg-[#2E6B6B]" />
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="bg-[#D6D8DC]/30">
                <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-[#2C2C2C]/60">
                    <Link href="/" className="hover:text-[#1B3A6B]">Home</Link>
                    <span>/</span>
                    <Link href="#" className="hover:text-[#1B3A6B]">Products & Services</Link>
                    <span>/</span>
                    <span className="font-medium text-[#1B3A6B]">Savings</span>
                </div>
            </div>

            {/* Savings Products */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-[#1B3A6B]">Savings Products</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-[#2E6B6B]" />
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: PiggyBank,
                                title: 'Regular Savings',
                                desc: 'Build your savings steadily with our regular savings account offering competitive interest rates.',
                                features: ['High-yield interest', 'Flexible deposits', 'Easy access'],
                            },
                            {
                                icon: Clock,
                                title: 'Time Deposit',
                                desc: 'Lock in higher interest rates for a fixed period. Ideal for members with surplus funds.',
                                features: ['Higher interest rates', 'Fixed term periods', 'Guaranteed returns'],
                            },
                            {
                                icon: TrendingUp,
                                title: 'Share Capital',
                                desc: 'Build ownership in the cooperative and earn dividends from annual profits.',
                                features: ['Dividend earnings', 'Voting rights', 'Loan multiplier'],
                            },
                        ].map((product) => (
                            <div key={product.title} className="rounded-2xl border border-[#D6D8DC]/60 bg-white p-8 shadow-md transition-all hover:shadow-lg">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1B3A6B]/10 text-[#1B3A6B]">
                                    <product.icon size={28} />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-[#1B3A6B]">{product.title}</h3>
                                <p className="mb-5 text-sm leading-relaxed text-[#2C2C2C]/70">{product.desc}</p>
                                <ul className="space-y-2">
                                    {product.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-[#2C2C2C]">
                                            <CheckCircle size={14} className="text-[#2E6B6B]" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Time Deposit Pre-termination */}
            <section className="bg-[#f7f8fa] py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-md">
                        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#1B3A6B]">
                            <Clock size={22} /> Time Deposit Pre-Termination
                        </h3>
                        <ul className="space-y-3">
                            {[
                                'Give 30-day notice and present the Certificate of Time Deposit',
                                'If withdrawn before maturity, savings deposit rates apply',
                                'After maturity, savings deposit rates apply if not renewed',
                                'You may request automatic renewal at prevailing rates',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-[#2C2C2C]/70">
                                    <CheckCircle size={16} className="mt-0.5 shrink-0 text-[#2E6B6B]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Share Capital CBU */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mx-auto max-w-4xl">
                        <div className="rounded-xl border-l-4 border-[#2E6B6B] bg-[#D6D8DC]/20 p-8">
                            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#1B3A6B]">
                                <Shield size={22} /> Continuous Capital Build-Up (CBU)
                            </h3>
                            <p className="mb-4 text-sm text-[#2C2C2C]/70">
                                Every member shall invest through:
                            </p>
                            <ul className="space-y-2">
                                {[
                                    'At least 50% of Interest on Capital',
                                    'At least 10% of Patronage Refund',
                                    'Monthly payroll deduction as determined by the Board',
                                    'CBU retentions from loan services availed',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-[#2C2C2C]">
                                        <CheckCircle size={14} className="mt-0.5 shrink-0 text-[#2E6B6B]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-4 text-sm text-[#2C2C2C]/70">
                                Capital Build-Up is compulsory until reaching the minimum required subscription of 10% of total subscribed share capital.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Withdrawal Policy */}
            <section className="bg-[#f7f8fa] py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-[#1B3A6B]">Withdrawal & Deposit Policy</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-[#2E6B6B]" />
                    </div>
                    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
                        {[
                            { label: 'Teller/Cashier Authorization', value: '₱50,000 and below' },
                            { label: 'Manager Authorization', value: 'Above ₱50,000' },
                            { label: 'Cash Release', value: '₱50,000 and below' },
                            { label: 'Check Release', value: 'Above ₱50,000' },
                            { label: 'Minimum Withdrawal', value: '₱100 or more' },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between rounded-lg bg-white p-5 shadow-sm">
                                <span className="font-medium text-[#1B3A6B]">{item.label}</span>
                                <span className="text-sm font-semibold text-[#2E6B6B]">{item.value}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-[#2C2C2C]/60">
                        Withdrawals must be made personally. Authorized representatives must present an ID.
                        Fractional peso withdrawals are not permitted except when closing an account.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-[#1B3A6B] to-[#4A7AAC] py-14">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-white">Start Growing Your Savings Today</h2>
                    <p className="mx-auto mb-6 max-w-xl text-white/80">
                        Visit our office or contact us to open your savings account.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#2E6B6B] px-7 py-3 font-semibold text-white transition hover:bg-[#245858]"
                    >
                        Get Started <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </FrontLayout>
    );
}
