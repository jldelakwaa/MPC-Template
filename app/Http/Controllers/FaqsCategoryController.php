<?php

namespace App\Http\Controllers;

use App\Http\Requests\FaqCategoryStoreRequest;
use App\Http\Requests\FaqCategoryUpdateRequest;
use App\Models\FaQCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqsCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = FaQCategory::withCount('faqs')->latest()->get();
        return Inertia::render('Admin/FaqCategories/index', ['categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/FaqCategories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FaqCategoryStoreRequest $request)
    {
        $validated = $request->validated();
        FaQCategory::create($validated);
           return redirect()->route('Admin.FaqCategories.index')
            ->with('success', 'Faq Category created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = FaQCategory::with('faqs')->findOrFail($id);
        return Inertia::render('Admin/FaqCategories/show', [
            'category' => $category
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $category = FaQCategory::findOrFail($id);
        return Inertia::render('Admin/FaqCategories/edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FaqCategoryUpdateRequest $request, string $id)
    {
        $category = FaQCategory::findOrFail($id);
        $validated = $request->validated();

        $category->update($validated);

        return redirect()->route('Admin.FaqCategories.index')
            ->with('success', 'FaQ Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = FaQCategory::findOrFail($id);
        $category->delete();

        return redirect()->route('Admin.FaqCategories.index')
            ->with('success', 'Faq Category deleted successfully.')
            ->with('swal', [
                'title' => 'Deleted!',
                'text' => 'Faq Category deleted successfully.',
                'icon' => 'success',
                'timer' => 3000,
            ]);
    }
}
