<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HeroController;
use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\CertificateController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\ContactMessageController as AdminContactMessageController;
use Illuminate\Support\Facades\Route;

// ─── Public Routes ────────────────────────────────────────────────────────────
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{project:slug}', [ProjectController::class, 'show'])->name('projects.show');

// Sitemap
Route::get('/sitemap.xml', function () {
    $projects = \App\Models\Project::active()->get();
    
    $xml = '<?xml version="1.0" encoding="UTF-8"?>';
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    
    // Homepage
    $xml .= '<url>';
    $xml .= '<loc>' . url('/') . '</loc>';
    $xml .= '<lastmod>' . now()->toAtomString() . '</lastmod>';
    $xml .= '<changefreq>daily</changefreq>';
    $xml .= '<priority>1.0</priority>';
    $xml .= '</url>';
    
    // Projects Index
    $xml .= '<url>';
    $xml .= '<loc>' . url('/projects') . '</loc>';
    $xml .= '<lastmod>' . now()->toAtomString() . '</lastmod>';
    $xml .= '<changefreq>weekly</changefreq>';
    $xml .= '<priority>0.8</priority>';
    $xml .= '</url>';
    
    // Project Show Pages
    foreach ($projects as $project) {
        $xml .= '<url>';
        $xml .= '<loc>' . url('/projects/' . $project->slug) . '</loc>';
        $xml .= '<lastmod>' . $project->updated_at->toAtomString() . '</lastmod>';
        $xml .= '<changefreq>monthly</changefreq>';
        $xml .= '<priority>0.7</priority>';
        $xml .= '</url>';
    }
    
    $xml .= '</urlset>';
    
    return response($xml, 200, [
        'Content-Type' => 'application/xml'
    ]);
});

// Contact Form
Route::post('/contact', [ContactMessageController::class, 'store'])->name('contact.store');

// ─── Auth Routes (Breeze) ─────────────────────────────────────────────────────
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ─── Admin Routes ─────────────────────────────────────────────────────────────
Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Hero
    Route::get('/hero', [HeroController::class, 'index'])->name('hero.index');
    Route::get('/hero/edit', [HeroController::class, 'edit'])->name('hero.edit');
    Route::put('/hero', [HeroController::class, 'update'])->name('hero.update');

    // About
    Route::get('/about', [AboutController::class, 'index'])->name('about.index');
    Route::get('/about/edit', [AboutController::class, 'edit'])->name('about.edit');
    Route::put('/about', [AboutController::class, 'update'])->name('about.update');

    // Experiences
    Route::resource('experiences', ExperienceController::class)->except(['show']);

    // Projects
    Route::resource('projects', AdminProjectController::class)->except(['show']);

    // Certificates
    Route::resource('certificates', CertificateController::class)->except(['show']);

    // Skills
    Route::resource('skills', SkillController::class)->except(['show']);

    // Contacts
    Route::resource('contacts', ContactController::class)->except(['show']);

    // Contact Messages (inbox)
    Route::get('/messages', [AdminContactMessageController::class, 'index'])->name('contact-messages.index');
    Route::get('/messages/{contactMessage}', [AdminContactMessageController::class, 'show'])->name('contact-messages.show');
    Route::post('/messages/{contactMessage}/mark-read', [AdminContactMessageController::class, 'markAsRead'])->name('contact-messages.mark-read');
    Route::delete('/messages/{contactMessage}', [AdminContactMessageController::class, 'destroy'])->name('contact-messages.destroy');
});

require __DIR__.'/auth.php';
