<?php

namespace Database\Seeders;

use App\Models\Certificate;
use Illuminate\Database\Seeder;

class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        Certificate::create([
            'title'          => 'Belajar Membuat Aplikasi Web dengan React',
            'issuer'         => 'Dicoding Indonesia',
            'issue_date'     => '2023-09-15',
            'expiry_date'    => null,
            'credential_id'  => 'DICODING-REACT-2023',
            'credential_url' => 'https://dicoding.com/certificates',
            'image'          => null,
            'category'       => 'Frontend',
            'order'          => 1,
            'is_active'      => true,
        ]);

        Certificate::create([
            'title'          => 'Belajar Pengembangan Aplikasi Web dengan Laravel',
            'issuer'         => 'Dicoding Indonesia',
            'issue_date'     => '2023-07-20',
            'expiry_date'    => null,
            'credential_id'  => 'DICODING-LARAVEL-2023',
            'credential_url' => 'https://dicoding.com/certificates',
            'image'          => null,
            'category'       => 'Backend',
            'order'          => 2,
            'is_active'      => true,
        ]);

        Certificate::create([
            'title'          => 'Junior Web Developer',
            'issuer'         => 'BNSP (Badan Nasional Sertifikasi Profesi)',
            'issue_date'     => '2023-05-10',
            'expiry_date'    => '2026-05-10',
            'credential_id'  => 'BNSP-JWD-2023-001234',
            'credential_url' => null,
            'image'          => null,
            'category'       => 'Profesi',
            'order'          => 3,
            'is_active'      => true,
        ]);

        Certificate::create([
            'title'          => 'Responsive Web Design',
            'issuer'         => 'freeCodeCamp',
            'issue_date'     => '2022-11-05',
            'expiry_date'    => null,
            'credential_id'  => 'FCC-RWD-2022',
            'credential_url' => 'https://freecodecamp.org/certification',
            'image'          => null,
            'category'       => 'Frontend',
            'order'          => 4,
            'is_active'      => true,
        ]);

        Certificate::create([
            'title'          => 'JavaScript Algorithms and Data Structures',
            'issuer'         => 'freeCodeCamp',
            'issue_date'     => '2022-09-18',
            'expiry_date'    => null,
            'credential_id'  => 'FCC-JS-2022',
            'credential_url' => 'https://freecodecamp.org/certification',
            'image'          => null,
            'category'       => 'Frontend',
            'order'          => 5,
            'is_active'      => true,
        ]);

        Certificate::create([
            'title'          => 'Cloud Practitioner Essentials',
            'issuer'         => 'AWS (Amazon Web Services)',
            'issue_date'     => '2024-01-10',
            'expiry_date'    => null,
            'credential_id'  => 'AWS-CPE-2024',
            'credential_url' => 'https://aws.amazon.com/verification',
            'image'          => null,
            'category'       => 'Cloud',
            'order'          => 6,
            'is_active'      => true,
        ]);
    }
}
