<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        // Frontend
        Skill::create(['name' => 'HTML & CSS',    'category' => 'Frontend', 'proficiency' => 95, 'icon' => 'html5',       'color' => '#E34F26', 'order' => 1,  'is_active' => true]);
        Skill::create(['name' => 'JavaScript',    'category' => 'Frontend', 'proficiency' => 88, 'icon' => 'javascript',  'color' => '#F7DF1E', 'order' => 2,  'is_active' => true]);
        Skill::create(['name' => 'TypeScript',    'category' => 'Frontend', 'proficiency' => 82, 'icon' => 'typescript',  'color' => '#3178C6', 'order' => 3,  'is_active' => true]);
        Skill::create(['name' => 'React',         'category' => 'Frontend', 'proficiency' => 85, 'icon' => 'react',       'color' => '#61DAFB', 'order' => 4,  'is_active' => true]);
        Skill::create(['name' => 'Tailwind CSS',  'category' => 'Frontend', 'proficiency' => 92, 'icon' => 'tailwindcss', 'color' => '#06B6D4', 'order' => 5,  'is_active' => true]);
        Skill::create(['name' => 'Inertia.js',    'category' => 'Frontend', 'proficiency' => 85, 'icon' => 'inertia',     'color' => '#9553E9', 'order' => 6,  'is_active' => true]);

        // Backend
        Skill::create(['name' => 'PHP',           'category' => 'Backend',  'proficiency' => 90, 'icon' => 'php',         'color' => '#777BB4', 'order' => 7,  'is_active' => true]);
        Skill::create(['name' => 'Laravel',       'category' => 'Backend',  'proficiency' => 93, 'icon' => 'laravel',     'color' => '#FF2D20', 'order' => 8,  'is_active' => true]);
        Skill::create(['name' => 'MySQL',         'category' => 'Backend',  'proficiency' => 88, 'icon' => 'mysql',       'color' => '#4479A1', 'order' => 9,  'is_active' => true]);
        Skill::create(['name' => 'REST API',      'category' => 'Backend',  'proficiency' => 90, 'icon' => 'api',         'color' => '#4ade80', 'order' => 10, 'is_active' => true]);
        Skill::create(['name' => 'Node.js',       'category' => 'Backend',  'proficiency' => 75, 'icon' => 'nodejs',      'color' => '#339933', 'order' => 11, 'is_active' => true]);

        // Mobile
        Skill::create(['name' => 'Flutter',       'category' => 'Mobile',   'proficiency' => 80, 'icon' => 'flutter',     'color' => '#54C5F8', 'order' => 12, 'is_active' => true]);
        Skill::create(['name' => 'Dart',          'category' => 'Mobile',   'proficiency' => 78, 'icon' => 'dart',        'color' => '#0175C2', 'order' => 13, 'is_active' => true]);
        Skill::create(['name' => 'React Native',  'category' => 'Mobile',   'proficiency' => 72, 'icon' => 'react',       'color' => '#61DAFB', 'order' => 14, 'is_active' => true]);

        // DevOps
        Skill::create(['name' => 'Docker',        'category' => 'DevOps',   'proficiency' => 75, 'icon' => 'docker',      'color' => '#2496ED', 'order' => 15, 'is_active' => true]);
        Skill::create(['name' => 'Linux',         'category' => 'DevOps',   'proficiency' => 80, 'icon' => 'linux',       'color' => '#FCC624', 'order' => 16, 'is_active' => true]);
        Skill::create(['name' => 'Git',           'category' => 'DevOps',   'proficiency' => 90, 'icon' => 'git',         'color' => '#F05032', 'order' => 17, 'is_active' => true]);
        Skill::create(['name' => 'CI/CD',         'category' => 'DevOps',   'proficiency' => 70, 'icon' => 'cicd',        'color' => '#4ade80', 'order' => 18, 'is_active' => true]);
    }
}
