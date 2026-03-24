<?php

use App\Http\Controllers\DownloadableController;
use App\Models\AppSetting;
use App\Models\ContactMessage;
use App\Models\FaQC;
use App\Models\FaQCategory;
use App\Models\Gallery;
use App\Models\GalleryCategory;
use App\Models\HomePageImage;
use App\Models\NewsUpdate;
use App\Models\OfficerCategory;
use App\Mail\ContactFormSubmitted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public / Front-page Routes
|--------------------------------------------------------------------------
*/

// Home
Route::get('/', function () {
    return Inertia::render('Frontpage/Home/Index', [
        'slides'     => Cache::remember('frontpage_home_slides', now()->addMinutes(10), fn () => HomePageImage::all()),
        'latestNews' => Cache::remember('frontpage_home_latest_news', now()->addMinutes(10), fn () => NewsUpdate::latest()->take(6)->get()),
    ]);
})->name('home');

// ── About Us ────────────────────────────────────────────────────────────
Route::get('/about', function () {
    return Inertia::render('Frontpage/AboutUs/About');
})->name('about');

Route::get('/about/gallery', function () {
    return Inertia::render('Frontpage/AboutUs/Gallery', [
        'galleries'  => Cache::remember('frontpage_about_gallery_items', now()->addMinutes(10), fn () => Gallery::with('category')->latest()->get()),
        'categories' => Cache::remember('frontpage_about_gallery_categories', now()->addMinutes(10), fn () => GalleryCategory::all()),
    ]);
})->name('about.gallery');

Route::get('/about/history', function () {
    return Inertia::render('Frontpage/AboutUs/History');
})->name('about.history');

Route::get('/about/membership', function () {
    return Inertia::render('Frontpage/AboutUs/Membership');
})->name('about.membership');

// ── Products & Services ─────────────────────────────────────────────────
Route::get('/services', function () {
    return Inertia::render('Frontpage/Services/Index');
})->name('services.index');

Route::get('/services/loans', function () {
    return Inertia::render('Frontpage/Services/Loans');
})->name('services.loans');

Route::get('/services/savings', function () {
    return Inertia::render('Frontpage/Services/Savings');
})->name('services.savings');

Route::get('/services/hostel', function () {
    return Inertia::render('Frontpage/Services/Hostel');
})->name('services.hostel');

Route::get('/services/water-refilling', function () {
    return Inertia::render('Frontpage/Services/WaterRefilling');
})->name('services.water-refilling');

Route::get('/services/commercial-building', function () {
    return Inertia::render('Frontpage/Services/CommercialBuilding');
})->name('services.commercial-building');

// ── FAQs ────────────────────────────────────────────────────────────────
Route::get('/faqs', function () {
    return Inertia::render("Frontpage/Faq's/Index", [
        'faqs' => Cache::remember('frontpage_faqs_items', now()->addMinutes(10), fn () => FaQC::with('faqCategory')->orderBy('id')->get()),
        'categories' => Cache::remember('frontpage_faqs_categories', now()->addMinutes(10), fn () => FaQCategory::orderBy('title')->get()),
    ]);
})->name('faqs');

// ── News & Updates ──────────────────────────────────────────────────────
Route::get('/news', function () {
    return Inertia::render('Frontpage/News/Index', [
        'news' => Cache::remember('frontpage_news_items', now()->addMinutes(10), fn () => NewsUpdate::latest()->get()),
    ]);
})->name('news.index');

// ── Contact (POST) ───────────────────────────────────────────────────────
Route::post('/contact', function (Request $request) {
    $validated = $request->validate([
        'name'    => 'required|string|max:255',
        'email'   => 'required|email|max:255',
        'subject' => 'required|string|max:255',
        'message' => 'required|string|max:5000',
        'website' => 'nullable|string|max:255',
    ]);

    if (! empty($validated['website'])) {
        return redirect()->back()->with('success', 'Your message has been sent. We will get back to you shortly.');
    }

    $adminEmail = Cache::remember('contact_recipient_email', now()->addMinutes(10), function () {
        return AppSetting::getValue('contact_recipient_email', config('mail.from.address'));
    });

    ContactMessage::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'subject' => $validated['subject'],
        'message' => $validated['message'],
        'ip_address' => $request->ip(),
        'user_agent' => $request->userAgent(),
    ]);

    if ($adminEmail) {
        Mail::to($adminEmail)->queue(new ContactFormSubmitted($validated));
    }

    return redirect()->back()->with('success', 'Your message has been sent. We will get back to you shortly.');
})->middleware('throttle:6,1')->name('contact.store');

Route::get('/news/{id}', function ($id) {
    $news = NewsUpdate::with('newsDetails')->findOrFail($id);
    return Inertia::render('Frontpage/News/Show', [
        'news' => $news,
    ]);
})->name('news.show');

// ── Officers ────────────────────────────────────────────────────────────
Route::get('/officers', function () {
    return Inertia::render('Frontpage/Officer/Index', [
        'categories' => Cache::remember('frontpage_officer_categories', now()->addMinutes(10), fn () => OfficerCategory::with('officers')->get()),
    ]);
})->name('officers');

// ── Contact Us ──────────────────────────────────────────────────────────
Route::get('/contact', function () {
    return Inertia::render('Frontpage/Contact/Index');
})->name('contact');

// ── Downloadable Forms ──────────────────────────────────────────────────
Route::get('/downloads', [DownloadableController::class, 'publicIndex'])->name('downloads');

// admin routes are stored separately in routes/admin.php
require __DIR__.'/admin.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
