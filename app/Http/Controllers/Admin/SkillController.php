<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    public function index(): Response
    {
        $skills = Skill::ordered()->paginate(15);

        return Inertia::render('Admin/Skill/Index', [
            'skills' => $skills,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Skill/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:100',
            'category'    => 'required|string|max:100',
            'proficiency' => 'required|integer|min:0|max:100',
            'icon'        => 'nullable|string|max:100',
            'color'       => 'nullable|string|max:20',
            'order'       => 'integer|min:0',
            'is_active'   => 'boolean',
        ]);

        Skill::create($validated);

        return redirect()->route('admin.skills.index')->with('success', 'Skill created successfully.');
    }

    public function edit(Skill $skill): Response
    {
        return Inertia::render('Admin/Skill/Edit', [
            'skill' => $skill,
        ]);
    }

    public function update(Request $request, Skill $skill): RedirectResponse
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:100',
            'category'    => 'required|string|max:100',
            'proficiency' => 'required|integer|min:0|max:100',
            'icon'        => 'nullable|string|max:100',
            'color'       => 'nullable|string|max:20',
            'order'       => 'integer|min:0',
            'is_active'   => 'boolean',
        ]);

        $skill->update($validated);

        return redirect()->route('admin.skills.index')->with('success', 'Skill updated successfully.');
    }

    public function destroy(Skill $skill): RedirectResponse
    {
        $skill->delete();

        return redirect()->route('admin.skills.index')->with('success', 'Skill deleted successfully.');
    }
}
