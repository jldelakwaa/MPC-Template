import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';
import { appConfig } from '@/config/env';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title={appConfig.name} />
            <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 lg:p-8">
                <div className="w-full max-w-sm text-center">
                    <div className="mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-navy text-white text-2xl font-bold shadow-lg">
                        {appConfig.name.charAt(0)}
                    </div>
                    <h1 className="mb-2 text-2xl font-bold text-foreground">{appConfig.name}</h1>
                    <p className="mb-8 text-sm text-muted-foreground">Multi-Purpose Cooperative</p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-lg bg-brand-teal px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-teal-dark"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="rounded-lg bg-brand-teal px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-teal-dark"
                                >
                                    Log in
                                </Link>
                            </>
                        )}
                        <Link
                            href="/"
                            className="rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
                        >
                            Visit Site
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}