<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\SiteSettingsUpdateRequest;
use App\Models\AppSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class SiteSettingsController extends Controller
{
    /**
     * Show site settings page.
     */
    public function edit(): Response
    {
        return Inertia::render('settings/site', [
            'contactRecipientEmail' => AppSetting::getValue('contact_recipient_email', config('mail.from.address')),
        ]);
    }

    /**
     * Update site settings.
     */
    public function update(SiteSettingsUpdateRequest $request): RedirectResponse
    {
        AppSetting::setValue('contact_recipient_email', $request->string('contact_recipient_email')->toString());
        Cache::forget('contact_recipient_email');

        return back()->with('success', 'Site settings updated successfully.');
    }
}
