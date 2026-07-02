<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\Certificate;
use App\Models\Contact;
use App\Models\Experience;
use App\Models\Hero;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $hero = Hero::getActive();
        $about = About::getActive();
        $experiences = Experience::active()->ordered()->get();
        $projects = Project::active()->featured()->ordered()->take(6)->get();
        $certificates = Certificate::active()->ordered()->get();
        $skills = Skill::active()->ordered()->get()->groupBy('category');
        $contacts = Contact::active()->ordered()->get();

        return Inertia::render('Home', [
            'hero'         => $hero,
            'about'        => $about,
            'experiences'  => $experiences,
            'projects'     => $projects,
            'certificates' => $certificates,
            'skills'       => $skills,
            'contacts'     => $contacts,
        ]);
    }
}
