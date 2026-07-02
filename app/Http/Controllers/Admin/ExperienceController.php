<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    public function index(): Response
    {
        $experiences = Experience::ordered()->paginate(10);

        return Inertia::render('Admin/Experience/Index', [
            'experiences' => $experiences,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Experience/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'company'          => 'required|string|max:255',
            'position'         => 'required|string|max:255',
            'type'             => 'required|in:work,education',
            'location'         => 'nullable|string|max:255',
            'start_date'       => 'required|date',
            'end_date'         => 'nullable|date|after:start_date',
            'is_current'       => 'boolean',
            'description'      => 'required|string',
            'responsibilities' => 'nullable|array',
            'responsibilities.*' => 'string',
            'company_logo'     => 'nullable|image|mimes:jpg,jpeg,png,webp,svg|max:1024',
            'order'            => 'integer|min:0',
            'is_active'        => 'boolean',
        ]);

        if ($request->hasFile('company_logo')) {
            $validated['company_logo'] = $request->file('company_logo')->store('experiences', 'public');
        }

        if ($validated['is_current'] ?? false) {
            $validated['end_date'] = null;
        }

        Experience::create($validated);

        return redirect()->route('admin.experiences.index')->with('success', 'Experience created successfully.');
    }

    public function edit(Experience $experience): Response
    {
        return Inertia::render('Admin/Experience/Edit', [
            'experience' => $experience,
        ]);
    }

    public function update(Request $request, Experience $experience): RedirectResponse
    {
        $validated = $request->validate([
            'company'          => 'required|string|max:255',
            'position'         => 'required|string|max:255',
            'type'             => 'required|in:work,education',
            'location'         => 'nullable|string|max:255',
            'start_date'       => 'required|date',
            'end_date'         => 'nullable|date|after:start_date',
            'is_current'       => 'boolean',
            'description'      => 'required|string',
            'responsibilities' => 'nullable|array',
            'responsibilities.*' => 'string',
            'company_logo'     => 'nullable|image|mimes:jpg,jpeg,png,webp,svg|max:1024',
            'order'            => 'integer|min:0',
            'is_active'        => 'boolean',
        ]);

        if ($request->hasFile('company_logo')) {
            if ($experience->company_logo) {
                Storage::disk('public')->delete($experience->company_logo);
            }
            $validated['company_logo'] = $request->file('company_logo')->store('experiences', 'public');
        }

        if ($validated['is_current'] ?? false) {
            $validated['end_date'] = null;
        }

        $experience->update($validated);

        return redirect()->route('admin.experiences.index')->with('success', 'Experience updated successfully.');
    }

    public function destroy(Experience $experience): RedirectResponse
    {
        if ($experience->company_logo) {
            Storage::disk('public')->delete($experience->company_logo);
        }

        $experience->delete();

        return redirect()->route('admin.experiences.index')->with('success', 'Experience deleted successfully.');
    }
}
