<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewsDetailStoreRequest;
use App\Http\Requests\NewsDetailUpdateRequest;
use App\Models\NewsDetail;
use App\Models\NewsUpdate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NewsDetailController extends Controller
{
    /**
     * Display a listing of news details for a specific news item.
     */
    public function index(Request $request, string $newsId)
    {
        $news = NewsUpdate::findOrFail($newsId);
        $search = $request->input('search');

        $newsDetails = NewsDetail::where('news_update_id', $newsId)
            ->when($search, function ($query, $search) {
                $query->where('content', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/NewsDetails/Index', [
            'newsDetails' => $newsDetails,
            'news' => $news,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new news detail.
     */
    public function create(string $newsId)
    {
        $news = NewsUpdate::findOrFail($newsId);

        return Inertia::render('Admin/NewsDetails/Create', [
            'news' => $news
        ]);
    }

    /**
     * Store a newly created news detail in storage.
     */
    public function store(NewsDetailStoreRequest $request, string $newsId)
    {
        $news = NewsUpdate::findOrFail($newsId);

        $validated = $request->validated();
        $validated['news_update_id'] = $newsId;

        if ($request->hasFile('pdf_files')) {
            $validated['pdf_files'] = $request->file('pdf_files')->store('news/pdfs', 'public');
        }

        NewsDetail::create($validated);

        return redirect()->route('Admin.NewsDetails.index', $newsId)
            ->with('success', 'News detail created successfully.');
    }

    /**
     * Display the specified news detail.
     */
    public function show(string $newsId, string $id)
    {
        $newsDetail = NewsDetail::where('news_update_id', $newsId)
            ->findOrFail($id);
        $news = NewsUpdate::findOrFail($newsId);

        return Inertia::render('Admin/NewsDetails/Show', [
            'newsDetail' => $newsDetail,
            'news' => $news
        ]);
    }

    /**
     * Show the form for editing the specified news detail.
     */
    public function edit(string $newsId, string $id)
    {
        $newsDetail = NewsDetail::where('news_update_id', $newsId)
            ->findOrFail($id);
        $news = NewsUpdate::findOrFail($newsId);

        return Inertia::render('Admin/NewsDetails/Edit', [
            'newsDetail' => $newsDetail,
            'news' => $news
        ]);
    }

    /**
     * Update the specified news detail in storage.
     */
    public function update(NewsDetailUpdateRequest $request, string $newsId, string $id)
    {
        $newsDetail = NewsDetail::where('news_update_id', $newsId)
            ->findOrFail($id);

        $validated = $request->validated();

        // Handle PDF file update
        if ($request->hasFile('pdf_files')) {
            // Delete old PDF if exists
            if ($newsDetail->pdf_files) {
                Storage::disk('public')->delete($newsDetail->pdf_files);
            }
            $validated['pdf_files'] = $request->file('pdf_files')->store('news/pdfs', 'public');
        } elseif ($request->boolean('remove_pdf')) {
            // If remove_pdf is true, delete the PDF and set it to null
            if ($newsDetail->pdf_files) {
                Storage::disk('public')->delete($newsDetail->pdf_files);
            }
            $validated['pdf_files'] = null;
        } else {
            // If no new PDF is uploaded and remove_pdf is false, keep the existing PDF
            unset($validated['pdf_files']);
        }

        $newsDetail->update($validated);

        return redirect()->route('Admin.NewsDetails.index', $newsId)
            ->with('success', 'News detail updated successfully.');
    }

    /**
     * Remove the specified news detail from storage.
     */
    public function destroy(string $newsId, string $id)
    {
        $newsDetail = NewsDetail::where('news_update_id', $newsId)
            ->findOrFail($id);

        // Delete PDF if exists
        if ($newsDetail->pdf_files) {
            Storage::disk('public')->delete($newsDetail->pdf_files);
        }

        $newsDetail->delete();

        return redirect()->route('Admin.NewsDetails.index', $newsId)
            ->with('swal', [
                'title' => 'Deleted!',
                'text' => 'News detail deleted successfully.',
                'icon' => 'success',
                'timer' => 3000,
            ]);
    }

    /**
     * Bulk delete news details
     */
    public function bulkDestroy(Request $request, string $newsId)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:news_details,id',
        ]);

        $newsDetails = NewsDetail::where('news_update_id', $newsId)
            ->whereIn('id', $request->input('ids'))
            ->get();

        foreach ($newsDetails as $newsDetail) {
            if ($newsDetail->pdf_files) {
                Storage::disk('public')->delete($newsDetail->pdf_files);
            }
            $newsDetail->delete();
        }

        return redirect()->back()->with('success', 'Selected news details have been deleted.');
    }
}
