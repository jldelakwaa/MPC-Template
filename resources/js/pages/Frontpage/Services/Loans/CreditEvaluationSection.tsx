import { useState } from 'react';
import { Calculator, ChevronDown, FileText, HandCoins, Shield, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
    creditEvaluationItems,
    type ContentBlock,
    type CreditEvalIconName,
} from '../../_data/loans.data';

const iconMap: Record<CreditEvalIconName, LucideIcon> = {
    Shield,
    Calculator,
    HandCoins,
    FileText,
    Users,
};

function renderContentBlock(block: ContentBlock, idx: number) {
    if (block.type === 'p') {
        return (
            <p key={idx} className={block.indent ? 'indent-8' : ''}>
                {block.parts.map((part, pIdx) =>
                    part.bold ? <strong key={pIdx}>{part.text}</strong> : <span key={pIdx}>{part.text}</span>
                )}
            </p>
        );
    }
    if (block.type === 'ol') {
        return (
            <ol key={idx} className="ml-4 list-decimal space-y-1">
                {block.items.map((item, iIdx) => (
                    <li key={iIdx}>{item}</li>
                ))}
            </ol>
        );
    }
    // subsection
    return (
        <div key={idx}>
            <p className="mb-2 font-semibold text-foreground">{block.heading}</p>
            {block.intro && <p className="mb-2 indent-8">{block.intro}</p>}
            <ol className="ml-4 list-decimal space-y-1">
                {block.list.map((item, iIdx) => (
                    <li key={iIdx}>{item}</li>
                ))}
            </ol>
        </div>
    );
}

export default function CreditEvaluationSection() {
    const [openSection, setOpenSection] = useState<string | null>('evaluation');
    const toggle = (section: string) =>
        setOpenSection(openSection === section ? null : section);

    const AccordionItem: React.FC<{item: typeof creditEvaluationItems[number];isOpen:boolean;onClick:() => void}> = ({item,isOpen,onClick}) => {
        const Icon = iconMap[item.iconName];
        return (
        <div className="overflow-hidden rounded-xl bg-card shadow-sm">
            <button
                onClick={onClick}
                className="flex w-full items-center justify-between p-5 text-left transition hover:bg-brand-border/20"
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-teal/10 text-brand-teal">
                        <Icon size={20} />
                    </div>
                    <span className="text-lg font-semibold text-foreground">{item.title}</span>
                </div>
                <ChevronDown
                    size={20}
                    className={`text-foreground/40 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            {isOpen && (
                <div className="border-t border-border/40 px-5 py-4 text-sm leading-relaxed text-foreground/80">
                    <div className="space-y-3">
                        {item.content.map((block, idx) => renderContentBlock(block, idx))}
                    </div>
                </div>
            )}
        </div>
        );
    };

    return (
        <section className="bg-brand-surface py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-foreground">Who Can Borrow?</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded bg-brand-teal" />
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        Regular and associate members may avail of a loan, provided they are members in
                        good standing. All applications are subject to the cooperative's Credit Evaluation
                        Policy.
                    </p>
                </div>

                <div className="mx-auto max-w-4xl space-y-3">
                    {creditEvaluationItems.map((item) => (
                        <AccordionItem
                            key={item.id}
                            item={item}
                            isOpen={openSection === item.id}
                            onClick={() => toggle(item.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

