import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import Breadcrumb from '@/components/Breadcrumb';
import FrontHero from '@/components/FrontHero';
import LoanTypesSection from './Loans/LoanTypesSection';
import LoanRequirementsSection from './Loans/LoanRequirementsSection';
import CreditEvaluationSection from './Loans/CreditEvaluationSection';
import LoanChargesSection from './Loans/LoanChargesSection';
import LoanPoliciesSection from './Loans/LoanPoliciesSection';
import LoanRenewalSection from './Loans/LoanRenewalSection';
import CoolingOffSection from './Loans/CoolingOffSection';
import LoanMonitoringSection from './Loans/LoanMonitoringSection';
import LoanCTASection from './Loans/LoanCTASection';

export default function Loans() {
    return (
        <FrontLayout title="Loans">
            {/* Hero Banner */}
            <FrontHero
                eyebrow="Loans"
                title="Loan Products"
                subtitle="Flexible credit options with clear terms."
            />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products & Services', href: '/services' },
                    { label: 'Loans' },
                ]}
            />

            <LoanTypesSection />
            <LoanRequirementsSection />
            <CreditEvaluationSection />
            <LoanRenewalSection />
            <LoanChargesSection />
            <LoanPoliciesSection />
            <CoolingOffSection />
            <LoanMonitoringSection />
            <LoanCTASection />
        </FrontLayout>
    );
}
