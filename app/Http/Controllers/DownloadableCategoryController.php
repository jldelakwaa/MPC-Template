<?php

namespace App\Http\Controllers;

use App\Models\DownloadableCategory;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use Illuminate\Http\Request;

class DownloadableCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $downloadables = DownloadableCategory::withCount('downloadables')
            ->when($request->input('search'), function ($query, $search) {
                $query->where('category_name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/DownloadableCategories/index', [
            'downloadables' => $downloadables,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/DownloadableCategories/create');


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_name' => 'required|string|max:255|unique:downloadable_categories,category_name',
            'description' => 'nullable|string',
        ]);

        DownloadableCategory::create($validated);

        return redirect()->route('Admin.DownloadableCategories.index')
            ->with('success', 'Downloadable Category created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = DownloadableCategory::with('downloadables')->findOrFail($id);
        return Inertia::render('Admin/DownloadableCategories/show', [
            'category' => $category
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $category = DownloadableCategory::findOrFail($id);
        return Inertia::render('Admin/DownloadableCategories/edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = DownloadableCategory::findOrFail($id);

        $validated = $request->validate([
            'category_name' => 'required|string|max:255|unique:downloadable_categories,category_name,' . $id,
            'description' => 'nullable|string',
        ]);

        $category->update($validated);

        return redirect()->route('Admin.DownloadableCategories.index')
            ->with('success', 'Downloadable Category updated successfully.');



    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = DownloadableCategory::findOrFail($id);
        $category->delete();

        return redirect()->route('Admin.DownloadableCategories.index')
            ->with('success', 'Downloadable Category deleted successfully.');
    }

      public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:downloadable_categories,id',
        ]);

        $categories = DownloadableCategory::whereIn('id', $request->input('ids'))->get();

        foreach ($categories as $category) {
            // No files associated directly with DownloadableCategory,
            // but if there were, this is where you'd delete them.
            // For now, just delete the category.
            $category->delete();
        }

         return redirect()->back()->with('swal', [
            'title' => 'Deleted!',
            'text' => 'Selected downloadable categories have been deleted.',
            'icon' => 'success',
            'timer' => 3000,
        ]);

    }
}
