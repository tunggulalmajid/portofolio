<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        // Frontend
        Skill::create(['name' => 'HTML & CSS',    'category' => 'Frontend', 'icon_name' => 'Code2',       'color' => '#E34F26', 'order' => 1,  'is_active' => true]);
        Skill::create(['name' => 'JavaScript',    'category' => 'Frontend', 'icon_name' => 'FileCode',    'color' => '#F7DF1E', 'order' => 2,  'is_active' => true]);
        Skill::create(['name' => 'TypeScript',    'category' => 'Frontend', 'icon_name' => 'FileType',    'color' => '#3178C6', 'order' => 3,  'is_active' => true]);
        Skill::create(['name' => 'React',         'category' => 'Frontend', 'icon_name' => 'Atom',        'color' => '#61DAFB', 'order' => 4,  'is_active' => true]);
        Skill::create(['name' => 'Tailwind CSS',  'category' => 'Frontend', 'icon_name' => 'Paintbrush',  'color' => '#06B6D4', 'order' => 5,  'is_active' => true]);
        Skill::create(['name' => 'Inertia.js',    'category' => 'Frontend', 'icon_name' => 'Layers',      'color' => '#9553E9', 'order' => 6,  'is_active' => true]);

        // Backend
        Skill::create(['name' => 'PHP',           'category' => 'Backend',  'icon_name' => 'Code',        'color' => '#777BB4', 'order' => 7,  'is_active' => true]);
        Skill::create(['name' => 'Laravel',       'category' => 'Backend',  'icon_name' => 'Boxes',       'color' => '#FF2D20', 'order' => 8,  'is_active' => true]);
        Skill::create(['name' => 'MySQL',         'category' => 'Backend',  'icon_name' => 'Database',    'color' => '#4479A1', 'order' => 9,  'is_active' => true]);
        Skill::create(['name' => 'REST API',      'category' => 'Backend',  'icon_name' => 'Network',     'color' => '#4ade80', 'order' => 10, 'is_active' => true]);
        Skill::create(['name' => 'Node.js',       'category' => 'Backend',  'icon_name' => 'Server',      'color' => '#339933', 'order' => 11, 'is_active' => true]);

        // Mobile
        Skill::create(['name' => 'Flutter',       'category' => 'Mobile',   'icon_name' => 'Smartphone',  'color' => '#54C5F8', 'order' => 12, 'is_active' => true]);
        Skill::create(['name' => 'Dart',          'category' => 'Mobile',   'icon_name' => 'Zap',         'color' => '#0175C2', 'order' => 13, 'is_active' => true]);
        Skill::create(['name' => 'React Native',  'category' => 'Mobile',   'icon_name' => 'Tablet',      'color' => '#61DAFB', 'order' => 14, 'is_active' => true]);

        // DevOps
        Skill::create(['name' => 'Docker',        'category' => 'DevOps',   'icon_name' => 'Container',   'color' => '#2496ED', 'order' => 15, 'is_active' => true]);
        Skill::create(['name' => 'Linux',         'category' => 'DevOps',   'icon_name' => 'Terminal',    'color' => '#FCC624', 'order' => 16, 'is_active' => true]);
        Skill::create(['name' => 'Git',           'category' => 'DevOps',   'icon_name' => 'GitBranch',   'color' => '#F05032', 'order' => 17, 'is_active' => true]);
        Skill::create(['name' => 'CI/CD',         'category' => 'DevOps',   'icon_name' => 'Workflow',    'color' => '#4ade80', 'order' => 18, 'is_active' => true]);
    }
}
