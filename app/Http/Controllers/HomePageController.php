<?php

namespace App\Http\Controllers;

use App\Http\Requests\HomePageImageStoreRequest;
use App\Http\Requests\HomePageImageUpdateRequest;
use App\Models\HomePageImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomePageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $homePageImages = HomePageImage::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('content', 'like', "%{$search}%")
                      ->orWhere('button_text', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/HomePage/Index', [
            'homePageImages' => $homePageImages,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/HomePage/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(HomePageImageStoreRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('homepage', 'public');
        }

        HomePageImage::create($validated);

        return redirect()->route('Admin.HomePage.index')
            ->with('success', 'Homepage image created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $homePageImage = HomePageImage::findOrFail($id);

        return Inertia::render('Admin/HomePage/Show', [
            'homePageImage' => $homePageImage
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $homePageImage = HomePageImage::findOrFail($id);

        return Inertia::render('Admin/HomePage/Edit', [
            'homePageImage' => $homePageImage
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(HomePageImageUpdateRequest $request, string $id)
    {
        $homePageImage = HomePageImage::findOrFail($id);

        $validated = $request->validated();

        // Handle image update
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($homePageImage->image) {
                Storage::disk('public')->delete($homePageImage->image);
            }
            $validated['image'] = $request->file('image')->store('homepage', 'public');
        } elseif ($request->boolean('remove_image')) {
            // If remove_image is true, delete the image and set it to null
            if ($homePageImage->image) {
                Storage::disk('public')->delete($homePageImage->image);
            }
            $validated['image'] = null;
        } else {
            // If no new image is uploaded and remove_image is false, keep the existing image
            unset($validated['image']);
        }

        $homePageImage->update($validated);

        return redirect()->route('Admin.HomePage.index')
            ->with('success', 'Homepage image updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $homePageImage = HomePageImage::findOrFail($id);

        // Delete image if exists
        if ($homePageImage->image) {
            Storage::disk('public')->delete($homePageImage->image);
        }

        $homePageImage->delete();

        return redirect()->route('Admin.HomePage.index')
            ->with('swal', [
                'title' => 'Deleted!',
                'text' => 'Homepage image deleted successfully.',
                'icon' => 'success',
                'timer' => 3000,
            ]);
    }

    /**
     * Bulk delete homepage images
     */
    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:homepage_images,id',
        ]);

        $homePageImages = HomePageImage::whereIn('id', $request->input('ids'))->get();

        foreach ($homePageImages as $homePageImage) {
            if ($homePageImage->image) {
                Storage::disk('public')->delete($homePageImage->image);
            }
            $homePageImage->delete();
        }

        return redirect()->back()->with('success', 'Selected homepage images have been deleted.');
    }
}
