<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'projects'     => Project::count(),
            'certificates' => Certificate::count(),
            'experiences'  => Experience::count(),
            'skills'       => Skill::count(),
            'featured_projects' => Project::where('is_featured', true)->count(),
            'active_projects'   => Project::where('is_active', true)->count(),
        ];

        $recentProjects = Project::latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats'          => $stats,
            'recentProjects' => $recentProjects,
        ]);
    }
}
