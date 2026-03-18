import AppLogoIcon from '@/components/app-logo-icon';
import { appConfig } from '@/config/env';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { home, login } from '@/routes';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle, Lock, Mail, User } from 'lucide-react';

export default function Register() {
    return (
        <div className="flex min-h-screen">
            <Head title="Register" />

            {/* Left panel — decorative branding */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden bg-brand-navy">
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
                        <span className="text-3xl font-bold tracking-tight">{appConfig.name}</span>
                    </Link>

                    <h2 className="mb-4 text-2xl font-semibold">Join our cooperative</h2>
                    <p className="text-lg leading-relaxed text-white/70">
                        Create your account and start enjoying all cooperative benefits and financial services.
                    </p>

                    <div className="mt-12 flex justify-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-white/40" />
                        <div className="h-2 w-8 rounded-full bg-white/80" />
                        <div className="h-2 w-2 rounded-full bg-white/40" />
                    </div>
                </div>
            </div>

            {/* Right panel — form */}
            <div className="flex w-full flex-col items-center justify-center bg-brand-light text-brand-navy px-6 py-12 lg:w-1/2 lg:px-14">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="mb-8 flex flex-col items-center lg:hidden">
                        <Link href={home()} className="flex flex-col items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy shadow-md">
                                <AppLogoIcon className="size-7 fill-current text-white" />
                            </div>
                            <span className="text-xl font-bold text-brand-navy">{appConfig.name}</span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-brand-navy">Create an account</h1>
                        <p className="mt-2 text-sm text-brand-navy/60">Fill in your details to get started</p>
                    </div>

                    <Form
                        action="/register"
                        method="post"
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="space-y-5"
                    >
                        {({ processing, errors }) => (
                            <>
                                {/* Name */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="name" className="text-sm font-medium text-brand-navy">
                                        Full name
                                    </Label>
                                    <div className="relative">
                                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-navy/40" />
                                        <Input
                                            id="name"
                                            type="text"
                                            name="name"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            placeholder="Your full name"
                                            className="pl-9"
                                        />
                                    </div>
                                    <InputError message={errors.name} />
                                </div>

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="email" className="text-sm font-medium text-brand-navy">
                                        Email address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-navy/40" />
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            placeholder="email@example.com"
                                            className="pl-9"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="password" className="text-sm font-medium text-brand-navy">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-navy/40" />
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                            className="pl-9"
                                        />
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                {/* Confirm password */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="password_confirmation" className="text-sm font-medium text-brand-navy">
                                        Confirm password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-navy/40" />
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                            className="pl-9"
                                        />
                                    </div>
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <Button
                                    type="submit"
                                    tabIndex={5}
                                    className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white border-0 h-11 text-sm font-semibold mt-2"
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Create account
                                </Button>

                                <p className="text-center text-sm text-brand-navy/60">
                                    Already have an account?{' '}
                                    <TextLink href={login()} tabIndex={6} className="font-medium text-brand-teal hover:text-brand-teal-dark">
                                        Sign in
                                    </TextLink>
                                </p>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}
