<?php

use App\Models\Downloadable;
use App\Models\DownloadableCategory;
use App\Models\FaQC;
use App\Models\FaQCategory;
use App\Models\Gallery;
use App\Models\GalleryCategory;
use App\Models\HomePageImage;
use App\Models\NewsUpdate;
use App\Models\OfficerCategory;
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
        'slides'     => HomePageImage::all(),
        'latestNews' => NewsUpdate::latest()->take(6)->get(),
    ]);
})->name('home');

// ── About Us ────────────────────────────────────────────────────────────
Route::get('/about/gallery', function () {
    return Inertia::render('Frontpage/AboutUs/Gallery', [
        'galleries'  => Gallery::with('category')->latest()->get(),
        'categories' => GalleryCategory::all(),
    ]);
})->name('about.gallery');

Route::get('/about/history', function () {
    return Inertia::render('Frontpage/AboutUs/History');
})->name('about.history');

Route::get('/about/membership', function () {
    return Inertia::render('Frontpage/AboutUs/Membership');
})->name('about.membership');

// ── Products & Services ─────────────────────────────────────────────────
Route::get('/services/loans', function () {
    return Inertia::render('Frontpage/Services/Loans');
})->name('services.loans');

Route::get('/services/savings', function () {
    return Inertia::render('Frontpage/Services/Savings');
})->name('services.savings');

Route::get('/services/safari', function () {
    return Inertia::render('Frontpage/Services/Safari');
})->name('services.safari');

Route::get('/services/aqua-bope', function () {
    return Inertia::render('Frontpage/Services/AquaBope');
})->name('services.aqua-bope');

Route::get('/services/commercial-building', function () {
    return Inertia::render('Frontpage/Services/CommercialBuilding');
})->name('services.commercial-building');

// ── FAQs ────────────────────────────────────────────────────────────────
Route::get('/faqs', function () {
    return Inertia::render("Frontpage/Faq's/Index", [
        'faqs'       => FaQC::with('faqCategory')->get(),
        'categories' => FaQCategory::all(),
    ]);
})->name('faqs');

// ── News & Updates ──────────────────────────────────────────────────────
Route::get('/news', function () {
    return Inertia::render('Frontpage/News/Index', [
        'news' => NewsUpdate::latest()->get(),
    ]);
})->name('news.index');

Route::get('/news/{id}', function ($id) {
    $news = NewsUpdate::with('newsDetails')->findOrFail($id);
    return Inertia::render('Frontpage/News/Show', [
        'news' => $news,
    ]);
})->name('news.show');

// ── Officers ────────────────────────────────────────────────────────────
Route::get('/officers', function () {
    return Inertia::render('Frontpage/Officer/Index', [
        'categories' => OfficerCategory::with('officers')->get(),
    ]);
})->name('officers');

// ── Contact Us ──────────────────────────────────────────────────────────
Route::get('/contact', function () {
    return Inertia::render('Frontpage/Contact/Index');
})->name('contact');

// ── Downloadable Forms ──────────────────────────────────────────────────
Route::get('/downloads', function () {
    return Inertia::render('Frontpage/Downloadbles/Index', [
        'downloadables' => Downloadable::with('category')->get(),
        'categories'    => DownloadableCategory::all(),
    ]);
})->name('downloads');

// admin routes are stored separately in routes/admin.php
require __DIR__.'/admin.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
