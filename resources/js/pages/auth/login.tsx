import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { home } from '@/routes';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle, Lock, Mail } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status }: LoginProps) {
    const appName = import.meta.env.VITE_APP_NAME || 'Website';

    return (
        <div className="flex min-h-screen">
            <Head title="Log in" />

            {/* Left panel — decorative branding */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70">
                {/* Ambient blobs */}
                <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                        backgroundSize: '44px 44px',
                    }}
                />

                <div className="relative z-10 max-w-md text-center text-white">
                    <Link href={home()} className="inline-flex flex-col items-center gap-4 mb-10">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-xl ring-1 ring-white/30 backdrop-blur-sm">
                            <AppLogoIcon className="size-9 fill-current text-white" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight">{appName}</span>
                    </Link>

                    <h2 className="mb-4 text-2xl font-semibold">Welcome back</h2>
                    <p className="text-lg leading-relaxed text-white/70">
                        Sign in to continue to your account and access all available features.
                    </p>

                    <div className="mt-12 flex justify-center gap-3">
                        <div className="h-2 w-8 rounded-full bg-white/80" />
                        <div className="h-2 w-2 rounded-full bg-white/40" />
                        <div className="h-2 w-2 rounded-full bg-white/40" />
                    </div>
                </div>
            </div>

            {/* Right panel — form */}
            <div className="flex w-full flex-col items-center justify-center bg-background px-6 py-12 lg:w-1/2 lg:px-14">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="mb-8 flex flex-col items-center lg:hidden">
                        <Link href={home()} className="flex flex-col items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-md">
                                <AppLogoIcon className="size-7 fill-current text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold">{appName}</span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
                        <p className="mt-2 text-sm text-muted-foreground">Enter your credentials to get access</p>
                    </div>

                    {status && (
                        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
                            {status}
                        </div>
                    )}

                    <Form
                        {...AuthenticatedSessionController.store.form()}
                        resetOnSuccess={['password']}
                        className="space-y-5"
                    >
                        {({ processing, errors }) => (
                            <>
                                {/* Email */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="email" className="text-sm font-medium">
                                        Email address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="email@example.com"
                                            className="pl-9"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-sm font-medium">
                                            Password
                                        </Label>
                                        {/* {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
                                                tabIndex={5}
                                            >
                                                Forgot password?
                                            </TextLink>
                                        )} */}
                                    </div>
                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            className="pl-9"
                                        />
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                {/* Remember me */}
                                <div className="flex items-center gap-2.5">
                                    <Checkbox id="remember" name="remember" tabIndex={3} />
                                    <Label
                                        htmlFor="remember"
                                        className="cursor-pointer text-sm font-normal text-muted-foreground"
                                    >
                                        Keep me signed in for 30 days
                                    </Label>
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="h-11 w-full font-semibold shadow-sm transition-all hover:shadow-md"
                                    tabIndex={4}
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    ) : (
                                        'Sign in'
                                    )}
                                </Button>

                                {/* Divider
                                <div className="relative my-1 flex items-center">
                                    <Separator className="flex-1" />
                                    <span className="mx-3 text-xs text-muted-foreground">or</span>
                                    <Separator className="flex-1" />
                                </div> */}

                                {/* Sign up link
                                <p className="text-center text-sm text-muted-foreground">
                                    Don't have an account?{' '}
                                    <TextLink
                                        href={register()}
                                        tabIndex={6}
                                        className="font-medium text-foreground transition-colors hover:text-primary"
                                    >
                                        Create an account
                                    </TextLink>
                                </p> */}
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}
