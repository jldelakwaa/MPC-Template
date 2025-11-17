<?php

namespace App\Http\Controllers;

use App\Http\Requests\OfficerCategoryStoreRequest;
use App\Http\Requests\OfficerCategoryUpdateRequest;
use App\Models\OfficerCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OfficerCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = OfficerCategory::withCount('officers')->latest()->get();
        return Inertia::render('Admin/OfficerCategories/index', [
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/OfficerCategories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OfficerCategoryStoreRequest $request)
    {
        $validated = $request->validated();

        OfficerCategory::create($validated);

        return redirect()->route('Admin.OfficerCategories.index')
            ->with('success', 'Officer Category created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = OfficerCategory::with('officers')->findOrFail($id);
        return Inertia::render('Admin/OfficerCategories/show', [
            'category' => $category
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $category = OfficerCategory::findOrFail($id);
        return Inertia::render('Admin/OfficerCategories/edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OfficerCategoryUpdateRequest $request, string $id)
    {
        $category = OfficerCategory::findOrFail($id);

        $validated = $request->validated();

        $category->update($validated);

        return redirect()->route('Admin.OfficerCategories.index')
            ->with('success', 'Officer Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = OfficerCategory::findOrFail($id);
        $category->delete();

        return redirect()->route('Admin.OfficerCategories.index')
            ->with('success', 'Officer Category deleted successfully.');
    }
}
