<?php

namespace App\Http\Controllers;

use App\Models\Downloadable;
use App\Models\DownloadableCategory;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DownloadableController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $downloadables = Downloadable::with('category')
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/Downloadables/index', [
            'downloadables' => $downloadables,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = DownloadableCategory::all();
        return Inertia::render('Admin/Downloadables/create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'downloadable_category_id' => 'required|exists:downloadable_categories,id',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'file' => 'nullable|mimes:pdf,doc,docx,xls,xlsx|max:10240', // Max 10MB
        ]);

        if ($request->hasFile('file')) {
            $validated['file_path'] = $request->file('file')->store('downloadables', 'public');
        }

        Downloadable::create($validated);

        return redirect()->route('Admin.Downloadables.index')
            ->with('success', 'Downloadable created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $downloadable = Downloadable::with('category')->findOrFail($id);
        return Inertia::render('Admin/Downloadables/show', [
            'downloadable' => $downloadable
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $downloadable = Downloadable::findOrFail($id);
        $categories = DownloadableCategory::all();
        return Inertia::render('Admin/Downloadables/edit', [
            'downloadable' => $downloadable,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $downloadable = Downloadable::findOrFail($id);

        $validated = $request->validate([
            'downloadable_category_id' => 'required|exists:downloadable_categories,id',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'file' => 'nullable|mimes:pdf,doc,docx,xls,xlsx|max:10240', // Max 10MB
        ]);

        if ($request->hasFile('file')) {
            // Delete old file if exists
            if ($downloadable->file_path) {
                Storage::disk('public')->delete($downloadable->file_path);
            }
            $validated['file_path'] = $request->file('file')->store('downloadables', 'public');
        }

        $downloadable->update($validated);

        return redirect()->route('Admin.Downloadables.index')
            ->with('success', 'Downloadable updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $downloadable = Downloadable::findOrFail($id);
        if ($downloadable->file_path) {
            Storage::disk('public')->delete($downloadable->file_path);
        }
        $downloadable->delete();

        return redirect()->route('Admin.Downloadables.index')
            ->with('swal', [
                'title' => 'Deleted!',
                'text' => 'Downloadable deleted successfully.',
                'icon' => 'success',
                'timer' => 3000,
            ]);
    }

      public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:downloadables,id',
        ]);

        $downloadables = Downloadable::whereIn('id', $request->input('ids'))->get();

        foreach ($downloadables as $downloadable) {
            if ($downloadable->file_path) {
                Storage::disk('public')->delete($downloadable->file_path);
            }
            $downloadable->delete();
        }

         return redirect()->back()->with('swal', [
            'title' => 'Deleted!',
            'text' => 'Selected downloadables have been deleted.',
            'icon' => 'success',
            'timer' => 3000,
        ]);

    }
}
