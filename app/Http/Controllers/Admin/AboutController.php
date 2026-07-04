<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        $about = About::first();

        return Inertia::render('Admin/About/Index', [
            'about' => $about,
        ]);
    }

    public function edit(): Response
    {
        $about = About::first();

        return Inertia::render('Admin/About/Edit', [
            'about' => $about,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'            => 'required|string|max:255',
            'description'      => 'required|string',
            'short_bio'        => 'required|string|max:500',
            'location'         => 'nullable|string|max:255',
            'email'            => 'nullable|email|max:255',
            'phone'            => 'nullable|string|max:50',
            'years_experience' => 'required|integer|min:0',
            'is_available'     => 'boolean',
            'is_active'        => 'boolean',
        ]);

        $about = About::firstOrNew();
        $about->fill($validated)->save();

        return redirect()->route('admin.about.index')->with('success', 'About updated successfully.');
    }
}
