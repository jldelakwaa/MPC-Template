<?php

namespace App\Http\Controllers;

use App\Models\GalleryCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $categories = GalleryCategory::withCount('galleries')->latest()->get();
        return Inertia::render('Admin/GalleryCategory/index', [
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/GalleryCategory/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_name' => 'required|string|max:255|unique:gallery_categories,category_name',
        ]);

        GalleryCategory::create($validated);

        return redirect()->route('Admin.GalleryCategory.index')
            ->with('success', 'Gallery Category created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $category = GalleryCategory::with('galleries')->findOrFail($id);
        return Inertia::render('Admin/GalleryCategory/show', [
            'category' => $category
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $category = GalleryCategory::findOrFail($id);
        return Inertia::render('Admin/GalleryCategory/edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = GalleryCategory::findOrFail($id);

        $validated = $request->validate([
            'category_name' => 'required|string|max:255|unique:gallery_categories,category_name,' . $id,
        ]);

        $category->update($validated);

        return redirect()->route('Admin.GalleryCategory.index')
            ->with('success', 'Gallery Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = GalleryCategory::findOrFail($id);
        $category->delete();

        return redirect()->route('Admin.GalleryCategory.index')
            ->with('success', 'Gallery Category deleted successfully.');
    }
}
