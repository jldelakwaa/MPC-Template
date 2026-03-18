import { Shield, CheckCircle } from 'lucide-react';
import { regularMemberShareCapital, associateMemberShareCapital, cbuItems } from '../../_data/savings.data';

export default function ShareCapitalSection() {
    return (
        <section className="bg-brand-surface py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-foreground">Share Capital</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                    <p className="mt-3 text-sm text-muted-foreground">Requirement Per Type of Member</p>
                </div>

                {/* Member Types */}
                <div className="mx-auto mb-10 grid max-w-4xl gap-6 md:grid-cols-2">
                    <div className="overflow-hidden rounded-xl shadow-md">
                        <div className="bg-brand-navy px-6 py-4">
                            <h3 className="text-lg font-bold text-white">Regular Members</h3>
                            <p className="mt-1 text-xs text-white/70">
                                Filipino citizen, of legal age, residing within the province of Bohol.
                                Permanent employees of the Provincial Government of Bohol.
                            </p>
                        </div>
                        <div className="bg-card p-6">
                            <ul className="space-y-3">
                                {regularMemberShareCapital.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                        <CheckCircle size={14} className="mt-0.5 shrink-0 text-brand-teal" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-md">
                        <div className="bg-brand-navy px-6 py-4">
                            <h3 className="text-lg font-bold text-white">Associate Members</h3>
                            <p className="mt-1 text-xs text-white/70">
                                Filipino citizen, of legal age, residing within the province of Bohol.
                                Non-permanent employee of the Provincial Government of Bohol.
                            </p>
                        </div>
                        <div className="bg-card p-6">
                            <ul className="space-y-3">
                                {associateMemberShareCapital.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                        <CheckCircle size={14} className="mt-0.5 shrink-0 text-brand-teal" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Continuous Capital Build-Up */}
                <div className="mx-auto max-w-4xl">
                    <div className="rounded-xl border-l-4 border-brand-teal bg-card p-8 shadow-sm">
                        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
                            <Shield size={22} /> Continuous Capital Build-Up (CBU)
                        </h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                            Every member shall invest through any or all of the following:
                        </p>
                        <ul className="space-y-2">
                            {cbuItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                    <CheckCircle size={14} className="mt-0.5 shrink-0 text-brand-teal" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-sm text-muted-foreground">
                            The continuous Capital Build-Up shall be compulsory to all members until it reaches the minimum required subscription of ten percent (10%) of total subscribed share capital.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

