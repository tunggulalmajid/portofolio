<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HeroController;
use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\CertificateController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\ContactController;
use Illuminate\Support\Facades\Route;

// ─── Public Routes ────────────────────────────────────────────────────────────
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{project:slug}', [ProjectController::class, 'show'])->name('projects.show');

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
});

require __DIR__.'/auth.php';
