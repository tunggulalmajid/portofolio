<?php

namespace Database\Seeders;

use App\Models\Hero;
use Illuminate\Database\Seeder;

class HeroSeeder extends Seeder
{
    public function run(): void
    {
        Hero::create([
            'name'                => 'Tunggul Abdul Majid',
            'tagline'             => 'Full Stack Developer & UI/UX Enthusiast',
            'description'         => 'Passionate about building beautiful, functional, and user-friendly web applications. Experienced in Laravel, React, and modern web technologies with a keen eye for clean design.',
            'profile_image'       => null,
            'cv_file'             => null,
            'cta_primary_text'    => 'Hire Me',
            'cta_primary_link'    => '/#contact',
            'cta_secondary_text'  => 'Download CV',
            'cta_secondary_link'  => '#',
            'is_active'           => true,
        ]);
    }
}
