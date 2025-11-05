<?php

namespace App\Http\Controllers;
use App\Models\Gallery;
use Inertia\Inertia;
use App\Models\GalleryCategory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
      public function index(Request $request)
    {
        $search = $request->input('search');

        $gallery = Gallery::with('category')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      ->orWhere('category_id', 'like', "%{$search}%")
                      ->orWhereHas('category', function ($q) use ($search) {
                          $q->where('name', 'like', "%{$search}%");
                      });
                });
            })
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/Gallery/index', [
            'gallery' => $gallery,
            'filters' => $request->only(['search'])
        ]);
    }


   /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = GalleryCategory::all();
        return Inertia::render('Admin/Gallery/create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
            'gallery_category_id' => 'required|exists:gallery_categories,id',
            'year' => 'nullable|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('gallery', 'public');
        }

        Gallery::create($validated);

        return redirect()->route('Admin.Gallery.index')
            ->with('success', 'Gallery created successfully.');
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
        $gallery = Gallery::findOrFail($id);
        $categories = GalleryCategory::all();
        return Inertia::render('Admin/Gallery/edit', [
            'gallery' => $gallery,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $gallery = Gallery::findOrFail($id);

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
            'category_id' => 'required|exists:gallery_categories,id',
            'year' => 'nullable|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle image update
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($gallery->image) {
                Storage::disk('public')->delete($gallery->image);
            }
            $validated['image'] = $request->file('image')->store('gallery', 'public');
        } elseif ($request->boolean('remove_image')) {
            // If remove_image is true, delete the image and set it to null
            if ($gallery->image) {
                Storage::disk('public')->delete($gallery->image);
            }
            $validated['image'] = null;
        } else {
            // If no new image is uploaded and remove_image is false, keep the existing image
            unset($validated['image']);
        }

        $gallery->update($validated);

        return redirect()->route('Admin.Gallery.index')
            ->with('success', 'Gallery item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $gallery = Gallery::findOrFail($id);

        // Delete image if exists
        if ($gallery->image) {
            Storage::disk('public')->delete($gallery->image);
        }

        $gallery->delete();

        return redirect()->route('Admin.Gallery.index')
            ->with('swal', [
                'title' => 'Deleted!',
                'text' => 'Gallery item deleted successfully.',
                'icon' => 'success',
                'timer' => 3000,
            ]);
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:galleries,id',
        ]);

        $galleries = Gallery::whereIn('id', $request->input('ids'))->get();

        foreach ($galleries as $gallery) {
            if ($gallery->image) {
                Storage::disk('public')->delete($gallery->image);
            }
            $gallery->delete();
        }

         return redirect()->back()->with('success', 'Selected gallery items have been deleted.');

    }
}
