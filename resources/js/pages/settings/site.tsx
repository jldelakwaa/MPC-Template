import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Site settings',
        href: '/settings/site',
    },
];

interface Props {
    contactRecipientEmail: string;
}

export default function SiteSettings({ contactRecipientEmail }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        contact_recipient_email: contactRecipientEmail ?? '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch('/settings/site', {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Contact recipient"
                        description="Set which email address receives website contact form submissions"
                    />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="contact_recipient_email">Recipient email</Label>
                            <Input
                                id="contact_recipient_email"
                                type="email"
                                value={data.contact_recipient_email}
                                onChange={(e) => setData('contact_recipient_email', e.target.value)}
                                placeholder="admin@example.com"
                                required
                            />
                            <InputError message={errors.contact_recipient_email} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>
                                Save settings
                            </Button>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
