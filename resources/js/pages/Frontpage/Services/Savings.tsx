import FrontLayout from '@/pages/Frontpage/layout/FrontLayout';
import Breadcrumb from '@/components/Breadcrumb';
import FrontHero from '@/components/FrontHero';
import SavingsProductsSection from './Savings/SavingsProductsSection';
import TimeDepositRatesSection from './Savings/TimeDepositRatesSection';
import PreTerminationSection from './Savings/PreTerminationSection';
import ShareCapitalSection from './Savings/ShareCapitalSection';
import WithdrawalPolicySection from './Savings/WithdrawalPolicySection';
import SavingsCTASection from './Savings/SavingsCTASection';

export default function Savings() {
    return (
        <FrontLayout title="Savings & Deposits">
            {/* Hero Banner */}
            <FrontHero
                eyebrow="Savings"
                title="Savings & Deposits"
                subtitle="Secure savings options designed for members."
            />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products & Services', href: '/services' },
                    { label: 'Savings' },
                ]}
            />

            <SavingsProductsSection />
            <TimeDepositRatesSection />
            <PreTerminationSection />
            <ShareCapitalSection />
            <WithdrawalPolicySection />
            <SavingsCTASection />
        </FrontLayout>
    );
}
