import AppLogoIcon from '@/components/app-logo-icon';
import { appConfig } from '@/config/env';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div
            className="flex min-h-svh flex-col items-center justify-center gap-6 bg-brand-light text-brand-navy p-6 md:p-10"
        >
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={home()} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy shadow-md">
                                <AppLogoIcon className="size-7 fill-current text-white" />
                            </div>
                            <span className="text-base font-bold text-brand-navy">{appConfig.name}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-semibold text-brand-navy">{title}</h1>
                            <p className="text-center text-sm text-brand-navy/60">{description}</p>
                        </div>
                    </div>
                    {children}
                    <div className="text-center">
                        <Link
                            href={home()}
                            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                            <ArrowLeft size={14} />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
