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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
