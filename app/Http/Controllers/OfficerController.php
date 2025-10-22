<?php

namespace App\Http\Controllers;

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
    public function index()
    {
        $officers = Officer::with('category')->latest()->paginate(5);
        return Inertia::render('Admin/Officers/index', [
            'officers' => $officers
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'officer_category_id' => 'nullable|exists:officer_categories,id',
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'birthday' => 'required|date',
            'yearservice' => 'required|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

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
    public function update(Request $request, string $id)
    {
        $officer = Officer::findOrFail($id);

        $validated = $request->validate([
            'officer_category_id' => 'nullable|exists:officer_categories,id',
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'birthday' => 'required|date',
            'yearservice' => 'required|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($officer->image) {
                Storage::disk('public')->delete($officer->image);
            }
            $validated['image'] = $request->file('image')->store('officers', 'public');
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
