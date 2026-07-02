<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $category = request('category');
        $search   = request('search');

        $query = Project::active()->ordered();

        if ($category && $category !== 'All') {
            $query->byCategory($category);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('short_description', 'like', "%{$search}%")
                  ->orWhereJsonContains('technologies', $search);
            });
        }

        $projects   = $query->paginate(9)->withQueryString();
        $categories = Project::active()->distinct()->pluck('category')->prepend('All');

        return Inertia::render('Projects/Index', [
            'projects'   => $projects,
            'categories' => $categories,
            'filters'    => [
                'category' => $category,
                'search'   => $search,
            ],
        ]);
    }

    public function show(Project $project): Response
    {
        $related = Project::active()
            ->where('id', '!=', $project->id)
            ->where('category', $project->category)
            ->ordered()
            ->take(3)
            ->get();

        return Inertia::render('Projects/Show', [
            'project' => $project,
            'related' => $related,
        ]);
    }
}
