<?php

namespace App\Http\Controllers;

use App\Http\Requests\GalleryCategoryStoreRequest;
use App\Http\Requests\GalleryCategoryUpdateRequest;
use App\Models\GalleryCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');

        $categories = GalleryCategory::withCount('galleries')
            ->when($search, function ($query, $search) {
                $query->where('category_name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/GalleryCategory/index', [
            'categories' => $categories,
            'filters' => [
                'search' => $search,
            ],
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
    public function store(GalleryCategoryStoreRequest $request)
    {
        $validated = $request->validated();

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
    public function update(GalleryCategoryUpdateRequest $request, string $id)
    {
        $category = GalleryCategory::findOrFail($id);

        $validated = $request->validated();

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

    /**
     * Bulk delete categories
     */
    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:gallery_categories,id',
        ]);

        GalleryCategory::whereIn('id', $request->ids)->delete();

        return redirect()->route('Admin.GalleryCategory.index')
            ->with('success', 'Selected categories deleted successfully.');
    }
}
