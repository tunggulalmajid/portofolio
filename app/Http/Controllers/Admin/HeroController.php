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
            'cta_primary_link'    => 'nullable|string|max:500',
            'cta_secondary_link'  => 'nullable|string|max:500',
            'is_active'           => 'boolean',
        ]);

        $hero = Hero::firstOrNew();
        $hero->fill($validated)->save();

        return redirect()->route('admin.hero.index')->with('success', 'Hero updated successfully.');
    }
}
