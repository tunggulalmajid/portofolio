<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hero;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HeroController extends Controller
{
    public function index(): Response
    {
        $hero = Hero::first();

        return Inertia::render('Admin/Hero/Index', [
            'hero' => $hero,
        ]);
    }

    public function edit(): Response
    {
        $hero = Hero::first();

        return Inertia::render('Admin/Hero/Edit', [
            'hero' => $hero,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'                => 'required|string|max:255',
            'tagline'             => 'required|string|max:255',
            'description'         => 'required|string',
            'profile_image'       => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'cv_file'             => 'nullable|file|mimes:pdf|max:5120',
            'cta_primary_text'    => 'required|string|max:100',
            'cta_primary_link'    => 'required|string|max:255',
            'cta_secondary_text'  => 'nullable|string|max:100',
            'cta_secondary_link'  => 'nullable|string|max:255',
            'is_active'           => 'boolean',
        ]);

        $hero = Hero::firstOrNew();

        if ($request->hasFile('profile_image')) {
            if ($hero->profile_image) {
                Storage::disk('public')->delete($hero->profile_image);
            }
            $validated['profile_image'] = $request->file('profile_image')->store('hero', 'public');
        }

        if ($request->hasFile('cv_file')) {
            if ($hero->cv_file) {
                Storage::disk('public')->delete($hero->cv_file);
            }
            $validated['cv_file'] = $request->file('cv_file')->store('cv', 'public');
        }

        $hero->fill($validated)->save();

        return redirect()->route('admin.hero.index')->with('success', 'Hero updated successfully.');
    }
}
