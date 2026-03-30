<?php

namespace App\Http\Controllers;

use App\Http\Requests\DownloadableCategoryStoreRequest;
use App\Http\Requests\DownloadableCategoryUpdateRequest;
use App\Models\DownloadableCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DownloadableCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $categories = DownloadableCategory::withCount('downloadables') // Fixed variable name
            ->when($request->input('search'), function ($query, $search) {
                $query->where('category_name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/DownloadableCategories/index', [ // Capital index
            'downloadables' => $categories, // Keep as 'downloadables' for frontend consistency
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/DownloadableCategories/create'); // Capital Create
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DownloadableCategoryStoreRequest $request)
    {
        $validated = $request->validated();

        DownloadableCategory::create($validated);
        $this->forgetFrontpageCaches();

        return redirect()->route('Admin.DownloadableCategories.index')
            ->with('success', 'Downloadable Category created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = DownloadableCategory::with('downloadables')->findOrFail($id);
        return Inertia::render('Admin/DownloadableCategories/show', [ // Capital Show
            'category' => $category
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $category = DownloadableCategory::findOrFail($id);
        return Inertia::render('Admin/DownloadableCategories/edit', [ // Capital edit
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DownloadableCategoryUpdateRequest $request, string $id)
    {
        $category = DownloadableCategory::findOrFail($id);

        $validated = $request->validated();

        $category->update($validated);
        $this->forgetFrontpageCaches();

        return redirect()->route('Admin.DownloadableCategories.index')
            ->with('success', 'Downloadable Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = DownloadableCategory::findOrFail($id);

        foreach ($category->downloadables as $downloadable) {
            if ($downloadable->downloadable_form) {
                Storage::disk('public')->delete($downloadable->downloadable_form);
            }
        }

        $category->delete();
        $this->forgetFrontpageCaches();

        return redirect()->route('Admin.DownloadableCategories.index')
            ->with('success', 'Downloadable Category deleted successfully.');
    }

    /**
     * Bulk delete categories
     */
    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:downloadable_categories,id',
        ]);

        $categories = DownloadableCategory::whereIn('id', $request->input('ids'))->get();

        foreach ($categories as $category) {
            foreach ($category->downloadables as $downloadable) {
                if ($downloadable->downloadable_form) {
                    Storage::disk('public')->delete($downloadable->downloadable_form);
                }
            }

            $category->delete();
        }

        $this->forgetFrontpageCaches();

        return redirect()->back()->with('success', 'Selected downloadable categories have been deleted.');
    }

    private function forgetFrontpageCaches(): void
    {
        Cache::forget('frontpage_downloadables_items');
        Cache::forget('frontpage_downloadables_categories');
    }
}
