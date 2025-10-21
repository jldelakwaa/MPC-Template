<?php

namespace App\Http\Controllers;

use App\Models\FaQC;
use App\Models\FaQCategory;
use App\Models\OfficerCategory; // Added this line
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqsController extends Controller
{
      /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $faqs = FaQC::with('faqCategory')->latest()->paginate(5);
        return Inertia::render('Admin/Faq/index', [
            'faqs' => $faqs
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'faqs_categoryid' => 'required|exists:faqs_category,id',
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);

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
    public function update(Request $request, string $id)
    {
        $faq = FaQC::findOrFail($id);

        $validated = $request->validate([
            'faqs_categoryid' => 'required|exists:faqs_category,id',
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);

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
}
