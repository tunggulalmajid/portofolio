<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Project::ordered()->paginate(10);

        return Inertia::render('Admin/Project/Index', [
            'projects' => $projects,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Project/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'             => 'required|string|max:255',
            'slug'              => 'nullable|string|max:255|unique:projects,slug',
            'short_description' => 'required|string|max:500',
            'full_description'  => 'required|string',
            'thumbnail'         => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'technologies'      => 'required|array|min:1',
            'technologies.*'    => 'string',
            'category'          => 'required|string|max:100',
            'demo_link'         => 'nullable|url|max:255',
            'repo_link'         => 'nullable|url|max:255',
            'status'            => 'required|in:completed,in_progress,archived',
            'is_featured'       => 'boolean',
            'order'             => 'integer|min:0',
            'is_active'         => 'boolean',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('projects', 'public');
        }

        Project::create($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Admin/Project/Edit', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $validated = $request->validate([
            'title'             => 'required|string|max:255',
            'slug'              => 'nullable|string|max:255|unique:projects,slug,' . $project->id,
            'short_description' => 'required|string|max:500',
            'full_description'  => 'required|string',
            'thumbnail'         => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'technologies'      => 'required|array|min:1',
            'technologies.*'    => 'string',
            'category'          => 'required|string|max:100',
            'demo_link'         => 'nullable|url|max:255',
            'repo_link'         => 'nullable|url|max:255',
            'status'            => 'required|in:completed,in_progress,archived',
            'is_featured'       => 'boolean',
            'order'             => 'integer|min:0',
            'is_active'         => 'boolean',
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($project->thumbnail) {
                Storage::disk('public')->delete($project->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')->store('projects', 'public');
        }

        $project->update($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        if ($project->thumbnail) {
            Storage::disk('public')->delete($project->thumbnail);
        }

        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}
