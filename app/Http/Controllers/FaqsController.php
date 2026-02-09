<?php

namespace App\Http\Controllers;

use App\Http\Requests\FaqStoreRequest;
use App\Http\Requests\FaqUpdateRequest;
use App\Models\FaQC;
use App\Models\FaQCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqsController extends Controller
{
      /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $faqs = FaQC::with('faqCategory')
            ->when($search, function ($query, $search) {
                $query->where('question', 'like', "%{$search}%")
                      ->orWhere('answer', 'like', "%{$search}%");
            })
            ->latest()->paginate(5);
        return Inertia::render('Admin/Faq/index', [
            'faqs' => $faqs,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = FaQCategory::all();
        return Inertia::render('Admin/Faq/create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FaqStoreRequest $request)
    {
        $validated = $request->validated();

        FaQC::create($validated);

        return redirect()->route('Admin.Faq.index')
            ->with('success', 'FAQ created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $faq = FaQC::findOrFail($id);
        $categories = FaQCategory::all();
        return Inertia::render('Admin/Faq/edit', [
            'faq' => $faq,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FaqUpdateRequest $request, string $id)
    {
        $faq = FaQC::findOrFail($id);

        $validated = $request->validated();

        $faq->update($validated);

        return redirect()->route('Admin.Faq.index')
            ->with('success', 'FAQ updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $faq = FaQC::findOrFail($id);
        $faq->delete();

        return redirect()->route('Admin.Faq.index')
            ->with('swal', [
            'title' => 'Deleted!',
            'text' => 'FAQ deleted successfully.',
            'icon' => 'success',
            'timer' => 3000,
            ]);
    }

     public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:faqs_c,id',
        ]);

        FaQC::whereIn('id', $request->input('ids'))->delete();

         return redirect()->back()->with('swal', [
            'title' => 'Deleted!',
            'text' => 'Selected FAQs have been deleted successfully.',
            'icon' => 'success',
            'timer' => 3000,
            ]);

    }
}
