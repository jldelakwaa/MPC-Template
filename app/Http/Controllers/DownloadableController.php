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
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      ->orWhereHas('category', function ($q) use ($search) {
                          $q->where('category_name', 'like', "%{$search}%");
                      });
                });
            })
            ->latest()
            ->paginate(10) // Increased from 5 to 10
            ->withQueryString();

        return Inertia::render('Admin/Downloadables/Index', [ // Capital Index
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
        return Inertia::render('Admin/Downloadables/Create', [ // Capital Create
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
            'title' => 'required|string|max:255', // Changed to required
            'description' => 'nullable|string',
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,txt,zip,rar|max:10240', // Added required and more file types
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
        return Inertia::render('Admin/Downloadables/Show', [ // Capital Show
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
        return Inertia::render('Admin/Downloadables/Edit', [ // Capital Edit
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
            'title' => 'required|string|max:255', // Changed to required
            'description' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,txt,zip,rar|max:10240', // Made optional for updates
        ]);

        if ($request->hasFile('file')) {
            // Delete old file if exists
            if ($downloadable->file_path) {
                Storage::disk('public')->delete($downloadable->file_path);
            }
            $validated['file_path'] = $request->file('file')->store('downloadables', 'public');
        } else {
            // Keep the existing file path if no new file is uploaded
            $validated['file_path'] = $downloadable->file_path;
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
            ->with('success', 'Downloadable deleted successfully.');
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

        return redirect()->back()->with('success', 'Selected downloadables have been deleted.');
    }
}
