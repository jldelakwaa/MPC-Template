<?php
use App\Http\Controllers\OfficerController;
use App\Http\Controllers\OfficerCategoryController;
use App\Http\Controllers\FaqsController;
use App\Http\Controllers\FaqsCategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Frontpage/welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Admin/dashboard');
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


    // Downloadable Forms
   Route::get('/DownloadableForms', [DownloadableFormsController::class, 'index'])->name('Admin.DownloadableForms.index');
    Route::get('/DownloadableForms/create', [DownloadableFormsController::class, 'create'])->name('Admin.DownloadableForms.create');
    Route::post('/DownloadableForms', [DownloadableFormsController::class, 'store'])->name('Admin.DownloadableForms.store');
    Route::get('/DownloadableForms/{id}/edit', [DownloadableFormsController::class, 'edit'])->name('Admin.DownloadableForms.edit');
    Route::put('/DownloadableForms/{id}', [DownloadableFormsController::class, 'update'])->name('Admin.DownloadableForms.update');
    Route::delete('/DownloadableForms/{id}', [DownloadableFormsController::class, 'destroy'])->name('Admin.DownloadableForms.destroy');

    // Downloadable Form Categories
    Route::get('/DownloadableFormCategories', [DownloadableFormCategoryController::class, 'index'])->name('Admin.DownloadableFormCategories.index');
    Route::get('/DownloadableFormCategories/create', [DownloadableFormCategoryController::class, 'create'])->name('Admin.DownloadableFormCategories.create');
    Route::post('/DownloadableFormCategories', [DownloadableFormCategoryController::class, 'store'])->name('Admin.DownloadableFormCategories.store');
    Route::get('/DownloadableFormCategories/{id}/edit', [DownloadableFormCategoryController::class, 'edit'])->name('Admin.DownloadableFormCategories.edit');
    Route::put('/DownloadableFormCategories/{id}', [DownloadableFormCategoryController::class, 'update'])->name('Admin.DownloadableFormCategories.update');
    Route::delete('/DownloadableFormCategories/{id}', [DownloadableFormCategoryController::class, 'destroy'])->name('Admin.DownloadableFormCategories.destroy');

    // Gallery
    Route::get('/Gallery', [GalleryController::class, 'index'])->name('Admin.Gallery.index');
    Route::get('/Gallery/create', [GalleryController::class, 'create'])->name('Admin.Gallery.create');
    Route::post('/Gallery', [GalleryController::class, 'store'])->name('Admin.Gallery.store');
    Route::get('/Gallery/{id}/edit', [GalleryController::class, 'edit'])->name('Admin.Gallery.edit');
    Route::put('/Gallery/{id}', [GalleryController::class, 'update'])->name('Admin.Gallery.update');
    Route::delete('/Gallery/{id}', [GalleryController::class, 'destroy'])->name('Admin.Gallery.destroy');

    // Gallery Categories
    Route::get('/GalleryCategories', [GalleryCategoryController::class, 'index'])->name('Admin.GalleryCategories.index');
    Route::get('/GalleryCategories/create', [GalleryCategoryController::class, 'create'])->name('Admin.GalleryCategories.create');
    Route::post('/GalleryCategories', [GalleryCategoryController::class, 'store'])->name('Admin.GalleryCategories.store');
    Route::get('/GalleryCategories/{id}/edit', [GalleryCategoryController::class, 'edit'])->name('Admin.GalleryCategories.edit');
    Route::put('/GalleryCategories/{id}', [GalleryCategoryController::class, 'update'])->name('Admin.GalleryCategories.update');
    Route::delete('/GalleryCategories/{id}', [GalleryCategoryController::class, 'destroy'])->name('Admin.GalleryCategories.destroy');

    // News
    Route::get('/News', [NewsController::class, 'index'])->name('Admin.News.index');
    Route::get('/News/create', [NewsController::class, 'create'])->name('Admin.News.create');
    Route::post('/News', [NewsController::class, 'store'])->name('Admin.News.store');
    Route::get('/News/{id}/edit', [NewsController::class, 'edit'])->name('Admin.News.edit');
    Route::put('/News/{id}', [NewsController::class, 'update'])->name('Admin.News.update');
    Route::delete('/News/{id}', [NewsController::class, 'destroy'])->name('Admin.News.destroy');

    // News Details
    Route::get('/NewsDetails', [NewsDetailsController::class, 'index'])->name('Admin.NewsDetails.index');
    Route::get('/NewsDetails/create', [NewsDetailsController::class, 'create'])->name('Admin.NewsDetails.create');
    Route::post('/NewsDetails', [NewsDetailsController::class, 'store'])->name('Admin.NewsDetails.store');
    Route::get('/NewsDetails/{id}/edit', [NewsDetailsController::class, 'edit'])->name('Admin.NewsDetails.edit');
    Route::put('/NewsDetails/{id}', [NewsDetailsController::class, 'update'])->name('Admin.NewsDetails.update');
    Route::delete('/NewsDetails/{id}', [NewsDetailsController::class, 'destroy'])->name('Admin.NewsDetails.destroy');

    // Home Page
    Route::get('/HomePage', [HomePageController::class, 'index'])->name('Admin.HomePage.index');
    Route::get('/HomePage/create', [HomePageController::class, 'create'])->name('Admin.HomePage.create');
    Route::post('/HomePage', [HomePageController::class, 'store'])->name('Admin.HomePage.store');
    Route::get('/HomePage/{id}/edit', [HomePageController::class, 'edit'])->name('Admin.HomePage.edit');
    Route::put('/HomePage/{id}', [HomePageController::class, 'update'])->name('Admin.HomePage.update');
    Route::delete('/HomePage/{id}', [HomePageController::class, 'destroy'])->name('Admin.HomePage.destroy');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
