<?php

namespace Database\Seeders;

use App\Models\About;
use Illuminate\Database\Seeder;

class AboutSeeder extends Seeder
{
    public function run(): void
    {
        About::create([
            'title'            => 'Tunggul Abdul Majid',
            'description'      => 'I am a passionate Full Stack Developer with experience building scalable web applications. I specialize in Laravel, React, and modern JavaScript frameworks. My journey started with a deep curiosity about how the web works, and has evolved into a career dedicated to crafting elegant, maintainable solutions.',
            'short_bio'        => 'Full Stack Developer specializing in Laravel & React. I love turning complex problems into simple, beautiful, and intuitive web experiences.',
            'profile_image'    => null,
            'location'         => 'Indonesia',
            'email'            => 'tunggul@example.com',
            'phone'            => '+62 812-3456-7890',
            'years_experience' => 3,
            'is_available'     => true,
            'is_active'        => true,
        ]);
    }
}
