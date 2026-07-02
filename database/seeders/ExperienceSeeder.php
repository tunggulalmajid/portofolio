<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        Experience::create([
            'company'          => 'PT. Inovasi Digital Nusantara',
            'position'         => 'Full Stack Developer',
            'type'             => 'work',
            'location'         => 'Jakarta, Indonesia',
            'start_date'       => '2023-01-01',
            'end_date'         => null,
            'is_current'       => true,
            'description'      => 'Developing and maintaining web applications for enterprise clients using Laravel and React. Collaborating with cross-functional teams to deliver high-quality software solutions.',
            'responsibilities' => [
                'Building scalable RESTful APIs with Laravel',
                'Developing interactive UIs with React and TypeScript',
                'Optimizing database queries and application performance',
                'Conducting code reviews and maintaining code quality',
            ],
            'company_logo'     => null,
            'order'            => 1,
            'is_active'        => true,
        ]);

        Experience::create([
            'company'          => 'Freelance Developer',
            'position'         => 'Web Developer',
            'type'             => 'work',
            'location'         => 'Remote',
            'start_date'       => '2021-06-01',
            'end_date'         => '2022-12-31',
            'is_current'       => false,
            'description'      => 'Worked with various clients to build custom web solutions ranging from company profiles to e-commerce platforms.',
            'responsibilities' => [
                'Developed custom Laravel & Vue.js web applications',
                'Designed responsive UI/UX using Figma and Tailwind CSS',
                'Integrated third-party APIs (payment, maps, notifications)',
                'Managed project timelines and client communication',
            ],
            'company_logo'     => null,
            'order'            => 2,
            'is_active'        => true,
        ]);

        Experience::create([
            'company'          => 'Universitas Teknologi Indonesia',
            'position'         => 'S1 Teknik Informatika',
            'type'             => 'education',
            'location'         => 'Indonesia',
            'start_date'       => '2019-08-01',
            'end_date'         => '2023-06-30',
            'is_current'       => false,
            'description'      => 'Graduated with honors. Focused on software engineering, web development, and database systems.',
            'responsibilities' => [
                'Pemrograman Web & Mobile',
                'Rekayasa Perangkat Lunak',
                'Basis Data & Sistem Informasi',
                'Jaringan Komputer',
            ],
            'company_logo'     => null,
            'order'            => 3,
            'is_active'        => true,
        ]);
    }
}
