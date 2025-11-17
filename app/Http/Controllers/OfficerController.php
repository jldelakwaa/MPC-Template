<?php

namespace App\Http\Controllers;

use App\Http\Requests\OfficerStoreRequest;
use App\Http\Requests\OfficerUpdateRequest;
use App\Models\Officer;
use App\Models\OfficerCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OfficerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $officers = Officer::with('category')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('position', 'like', "%{$search}%")
                      ->orWhere('birthday', 'like', "%{$search}%")
                      ->orWhere('yearservice', 'like', "%{$search}%")
                      ->orWhereHas('category', function ($q) use ($search) {
                          $q->where('name', 'like', "%{$search}%");
                      });
                });
            })
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/Officers/index', [
            'officers' => $officers,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = OfficerCategory::all();
        return Inertia::render('Admin/Officers/create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OfficerStoreRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('officers', 'public');
        }

        Officer::create($validated);

        return redirect()->route('Admin.Officers.index')
            ->with('success', 'Officer created successfully.');
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
        $officer = Officer::findOrFail($id);
        $categories = OfficerCategory::all();
        return Inertia::render('Admin/Officers/edit', [
            'officer' => $officer,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OfficerUpdateRequest $request, string $id)
    {
        $officer = Officer::findOrFail($id);

        $validated = $request->validated();

        // Handle image update
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($officer->image) {
                Storage::disk('public')->delete($officer->image);
            }
            $validated['image'] = $request->file('image')->store('officers', 'public');
        } elseif ($request->boolean('remove_image')) {
            // If remove_image is true, delete the image and set it to null
            if ($officer->image) {
                Storage::disk('public')->delete($officer->image);
            }
            $validated['image'] = null;
        } else {
            // If no new image is uploaded and remove_image is false, keep the existing image
            unset($validated['image']);
        }

        $officer->update($validated);

        return redirect()->route('Admin.Officers.index')
            ->with('success', 'Officer updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $officer = Officer::findOrFail($id);

        // Delete image if exists
        if ($officer->image) {
            Storage::disk('public')->delete($officer->image);
        }

        $officer->delete();

        return redirect()->route('Admin.Officers.index')
            ->with('swal', [
                'title' => 'Deleted!',
                'text' => 'Officer deleted successfully.',
                'icon' => 'success',
                'timer' => 3000,
            ]);
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:officers,id',
        ]);

        $officers = Officer::whereIn('id', $request->input('ids'))->get();

        foreach ($officers as $officer) {
            if ($officer->image) {
                Storage::disk('public')->delete($officer->image);
            }
            $officer->delete();
        }

         return redirect()->back()->with('success', 'Selected officers have been deleted.');

    }
}
