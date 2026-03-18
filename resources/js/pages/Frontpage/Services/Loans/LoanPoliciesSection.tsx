import { loanApprovalAuthority } from '../../_data/loans.data';

export default function LoanPoliciesSection() {
    return (
        <>
            {/* CBU Retention */}
            <section className="bg-card py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-foreground">
                            Loan Retention on Capital Build-Up (CBU) Program
                        </h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                    </div>
                    <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
                        <div className="rounded-xl bg-brand-navy/5 p-6">
                            <h3 className="mb-2 font-bold text-foreground">Long-Term Loans</h3>
                            <p className="text-sm leading-relaxed text-foreground/80">
                                CBU retention of <strong>20% of net proceeds</strong>, but not to exceed{' '}
                                <strong>₱5,000</strong>.
                            </p>
                        </div>
                        <div className="rounded-xl bg-brand-teal/5 p-6">
                            <h3 className="mb-2 font-bold text-brand-teal">Short-Term Loans</h3>
                            <p className="text-sm leading-relaxed text-foreground/80">
                                CBU retention of <strong>10% of net proceeds</strong> (before CBU deduction),
                                but not to exceed <strong>₱1,000</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Loan Approval Authority */}
            <section className="bg-brand-surface py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-foreground">Loan Approval Authority</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
                            After careful evaluation of credit, approval authority varies per loan type as follows:
                        </p>
                    </div>
                    <div className="mx-auto max-w-3xl overflow-hidden rounded-xl shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="bg-brand-navy text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold">Loan Type</th>
                                    <th className="px-6 py-4 text-left font-semibold">Approving Officer</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border/40 bg-card">
                                {loanApprovalAuthority.map((row) => (
                                    <tr key={row.approver} className="hover:bg-brand-surface">
                                        <td className="px-6 py-4 text-foreground">{row.loanType}</td>
                                        <td className="px-6 py-4 font-semibold text-brand-teal">{row.approver}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Policy Disclosure & Cut-off Period */}
            <section className="bg-card py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
                        {/* Policy Disclosure */}
                        <div className="rounded-xl bg-brand-border/20 p-8">
                            <h3 className="mb-4 text-xl font-bold text-foreground">
                                Policy Disclosure Statement
                            </h3>
                            <p className="text-sm leading-relaxed text-foreground/80">
                                In compliance with the{' '}
                                <strong>Truth in Lending Act</strong>, a disclosure statement shall be prepared in
                                two (2) copies and acknowledgment received by the borrower for their full
                                information as to the loan deductions and net proceeds of their corresponding
                                loans.
                            </p>
                        </div>

                        {/* Cut-off Period */}
                        <div className="rounded-xl bg-brand-navy/5 p-8">
                            <h3 className="mb-4 text-xl font-bold text-foreground">Cut-Off Period</h3>
                            <div className="space-y-4 text-sm leading-relaxed text-foreground/80">
                                <p>
                                    Loans released from the <strong>26th up to the 10th day</strong> of the
                                    following month shall be deducted its first interest due. The first principal
                                    installment will be due the following month.
                                </p>
                                <p>
                                    Loans released on the <strong>11th up to the 25th</strong> of the month shall
                                    pay its 1st monthly amortization payment on the following month.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

