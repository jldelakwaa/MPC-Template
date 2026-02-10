<?php
use App\Http\Controllers\DownloadableController;
use App\Http\Controllers\DownloadableCategoryController;
use App\Http\Controllers\OfficerController;
use App\Http\Controllers\OfficerCategoryController;
use App\Http\Controllers\FaqsController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\GalleryCategoryController;
use App\Http\Controllers\FaqsCategoryController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\NewsDetailController;
use App\Http\Controllers\HomePageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Frontpage/welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Admin/dashboard', [
            'stats' => [
                'officerCategories' => \App\Models\OfficerCategory::count(),
                'officers' => \App\Models\Officer::count(),
                'faqs' => \App\Models\FaQC::count(),
                'faqCategories' => \App\Models\FaQCategory::count(),
                'downloadables' => \App\Models\Downloadable::count(),
                'downloadableCategories' => \App\Models\DownloadableCategory::count(),
                'galleries' => \App\Models\Gallery::count(),
                'galleryCategories' => \App\Models\GalleryCategory::count(),
                'news' => \App\Models\NewsUpdate::count(),
                'homePageImages' => \App\Models\HomePageImage::count(),
            ]
        ]);
    })->name('dashboard');

    // Officer Categories
    Route::get('/OfficerCategories', [OfficerCategoryController::class, 'index'])->name('Admin.OfficerCategories.index');
    Route::get('/OfficerCategories/create', [OfficerCategoryController::class, 'create'])->name('Admin.OfficerCategories.create');
    Route::post('/OfficerCategories', [OfficerCategoryController::class, 'store'])->name('Admin.OfficerCategories.store');
    Route::get('/OfficerCategories/{id}/edit', [OfficerCategoryController::class, 'edit'])->name('Admin.OfficerCategories.edit');
    Route::put('/OfficerCategories/{id}', [OfficerCategoryController::class, 'update'])->name('Admin.OfficerCategories.update');
    Route::delete('/OfficerCategories/{id}', [OfficerCategoryController::class, 'destroy'])->name('Admin.OfficerCategories.destroy');

    // Officers
    Route::get('/Officers', [OfficerController::class, 'index'])->name('Admin.Officers.index');
    Route::get('/Officers/create', [OfficerController::class, 'create'])->name('Admin.Officers.create');
    Route::post('/Officers', [OfficerController::class, 'store'])->name('Admin.Officers.store');
    Route::get('/Officers/{id}/edit', [OfficerController::class, 'edit'])->name('Admin.Officers.edit');
    Route::put('/Officers/{id}', [OfficerController::class, 'update'])->name('Admin.Officers.update');
    Route::delete('/Officers/bulk-delete', [OfficerController::class, 'bulkDestroy'])->name('officers.bulkDestroy');
    Route::delete('/Officers/{id}', [OfficerController::class, 'destroy'])->name('Admin.Officers.destroy');

      // Faq
    Route::get('/Faq', [FaqsController::class, 'index'])->name('Admin.Faq.index');
    Route::get('/Faq/create', [FaqsController::class, 'create'])->name('Admin.Faq.create');
    Route::post('/Faq', [FaqsController::class, 'store'])->name('Admin.Faq.store');
    Route::get('/Faq/{id}/edit', [FaqsController::class, 'edit'])->name('Admin.Faq.edit');
    Route::put('/Faq/{id}', [FaqsController::class, 'update'])->name('Admin.Faq.update');
    Route::delete('/Faq/{id}', [FaqsController::class, 'destroy'])->name('Admin.Faq.destroy');

    // FaqsCategories
    Route::get('/FaqCategories', [FaqsCategoryController::class, 'index'])->name('Admin.FaqCategories.index');
    Route::get('/FaqCategories/create', [FaqsCategoryController::class, 'create'])->name('Admin.FaqCategories.create');
    Route::post('/FaqCategories', [FaqsCategoryController::class, 'store'])->name('Admin.FaqCategories.store');
    Route::get('/FaqCategories/{id}/edit', [FaqsCategoryController::class, 'edit'])->name('Admin.FaqCategories.edit');
    Route::put('/FaqCategories/{id}', [FaqsCategoryController::class, 'update'])->name('Admin.FaqCategories.update');
    Route::delete('/FaqCategories/{id}', [FaqsCategoryController::class, 'destroy'])->name('Admin.FaqCategories.destroy');


    // DownloadableController Forms
   Route::get('/Downloadables', [DownloadableController::class, 'index'])->name('Admin.Downloadables.index');
    Route::get('/Downloadables/create', [DownloadableController::class, 'create'])->name('Admin.Downloadables.create');
    Route::post('/Downloadables', [DownloadableController::class, 'store'])->name('Admin.Downloadables.store');
    Route::get('/Downloadables/{id}/edit', [DownloadableController::class, 'edit'])->name('Admin.Downloadables.edit');
    Route::put('/Downloadables/{id}', [DownloadableController::class, 'update'])->name('Admin.Downloadables.update');
    Route::delete('/Downloadables/{id}', [DownloadableController::class, 'destroy'])->name('Admin.Downloadables.destroy');

    // DownloadableController Form Categories
  Route::get('/DownloadableCategories', [DownloadableCategoryController::class, 'index'])->name('Admin.DownloadableCategories.index');
Route::get('/DownloadableCategories/create', [DownloadableCategoryController::class, 'create'])->name('Admin.DownloadableCategories.create');
Route::post('/DownloadableCategories', [DownloadableCategoryController::class, 'store'])->name('Admin.DownloadableCategories.store');
Route::get('/DownloadableCategories/{id}/edit', [DownloadableCategoryController::class, 'edit'])->name('Admin.DownloadableCategories.edit');
Route::put('/DownloadableCategories/{id}', [DownloadableCategoryController::class, 'update'])->name('Admin.DownloadableCategories.update');
Route::delete('/DownloadableCategories/{id}', [DownloadableCategoryController::class, 'destroy'])->name('Admin.DownloadableCategories.destroy');
Route::delete('/DownloadableCategories/bulk-delete', [DownloadableCategoryController::class, 'bulkDestroy'])->name('Admin.DownloadableCategories.bulkDestroy');

    // Gallery
    Route::get('/Gallery', [GalleryController::class, 'index'])->name('Admin.Gallery.index');
    Route::get('/Gallery/create', [GalleryController::class, 'create'])->name('Admin.Gallery.create');
    Route::post('/Gallery', [GalleryController::class, 'store'])->name('Admin.Gallery.store');
    Route::get('/Gallery/{id}/edit', [GalleryController::class, 'edit'])->name('Admin.Gallery.edit');
    Route::put('/Gallery/{id}', [GalleryController::class, 'update'])->name('Admin.Gallery.update');
    Route::delete('/Gallery/{id}', [GalleryController::class, 'destroy'])->name('Admin.Gallery.destroy');
    Route::delete('/Gallery/bulk-delete', [GalleryController::class, 'bulkDestroy'])->name('Admin.Gallery.bulkDestroy');

    // Gallery Categories
    Route::get('/GalleryCategory', [GalleryCategoryController::class, 'index'])->name('Admin.GalleryCategory.index');
    Route::get('/GalleryCategory/create', [GalleryCategoryController::class, 'create'])->name('Admin.GalleryCategory.create');
    Route::post('/GalleryCategory', [GalleryCategoryController::class, 'store'])->name('Admin.GalleryCategory.store');
    Route::get('/GalleryCategory/{id}/edit', [GalleryCategoryController::class, 'edit'])->name('Admin.GalleryCategory.edit');
    Route::put('/GalleryCategory/{id}', [GalleryCategoryController::class, 'update'])->name('Admin.GalleryCategory.update');
    Route::delete('/GalleryCategory/{id}', [GalleryCategoryController::class, 'destroy'])->name('Admin.GalleryCategory.destroy');
    Route::delete('/GalleryCategory/bulk-delete', [GalleryCategoryController::class, 'bulkDestroy'])->name('Admin.GalleryCategory.bulkDestroy');

    // News
    Route::get('/News', [NewsController::class, 'index'])->name('Admin.News.index');
    Route::get('/News/create', [NewsController::class, 'create'])->name('Admin.News.create');
    Route::post('/News', [NewsController::class, 'store'])->name('Admin.News.store');
    Route::get('/News/{id}', [NewsController::class, 'show'])->name('Admin.News.show');
    Route::get('/News/{id}/edit', [NewsController::class, 'edit'])->name('Admin.News.edit');
    Route::put('/News/{id}', [NewsController::class, 'update'])->name('Admin.News.update');
    Route::delete('/News/bulk-delete', [NewsController::class, 'bulkDestroy'])->name('Admin.News.bulkDestroy');
    Route::delete('/News/{id}', [NewsController::class, 'destroy'])->name('Admin.News.destroy');

    // News Details (Nested under News)
    Route::get('/News/{newsId}/details', [NewsDetailController::class, 'index'])->name('Admin.NewsDetails.index');
    Route::get('/News/{newsId}/details/create', [NewsDetailController::class, 'create'])->name('Admin.NewsDetails.create');
    Route::post('/News/{newsId}/details', [NewsDetailController::class, 'store'])->name('Admin.NewsDetails.store');
    Route::get('/News/{newsId}/details/{id}', [NewsDetailController::class, 'show'])->name('Admin.NewsDetails.show');
    Route::get('/News/{newsId}/details/{id}/edit', [NewsDetailController::class, 'edit'])->name('Admin.NewsDetails.edit');
    Route::put('/News/{newsId}/details/{id}', [NewsDetailController::class, 'update'])->name('Admin.NewsDetails.update');
    Route::delete('/News/{newsId}/details/bulk-delete', [NewsDetailController::class, 'bulkDestroy'])->name('Admin.NewsDetails.bulkDestroy');
    Route::delete('/News/{newsId}/details/{id}', [NewsDetailController::class, 'destroy'])->name('Admin.NewsDetails.destroy');

    // Home Page
    Route::get('/HomePage', [HomePageController::class, 'index'])->name('Admin.HomePage.index');
    Route::get('/HomePage/create', [HomePageController::class, 'create'])->name('Admin.HomePage.create');
    Route::post('/HomePage', [HomePageController::class, 'store'])->name('Admin.HomePage.store');
    Route::get('/HomePage/{id}', [HomePageController::class, 'show'])->name('Admin.HomePage.show');
    Route::get('/HomePage/{id}/edit', [HomePageController::class, 'edit'])->name('Admin.HomePage.edit');
    Route::put('/HomePage/{id}', [HomePageController::class, 'update'])->name('Admin.HomePage.update');
    Route::delete('/HomePage/bulk-delete', [HomePageController::class, 'bulkDestroy'])->name('Admin.HomePage.bulkDestroy');
    Route::delete('/HomePage/{id}', [HomePageController::class, 'destroy'])->name('Admin.HomePage.destroy');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
