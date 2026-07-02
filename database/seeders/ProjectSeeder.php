<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        Project::create([
            'title'             => 'Sistem Manajemen Perpustakaan',
            'slug'              => 'sistem-manajemen-perpustakaan',
            'short_description' => 'Aplikasi manajemen perpustakaan digital dengan fitur peminjaman, pengembalian, dan laporan buku.',
            'full_description'  => "Membangun sistem manajemen perpustakaan digital yang lengkap menggunakan Laravel dan React. Aplikasi ini memiliki fitur manajemen buku, anggota, peminjaman, dan pengembalian buku.\n\nFitur utama meliputi pencarian buku dengan filter kategori, manajemen anggota dengan QR code, notifikasi jatuh tempo via email, laporan statistik peminjaman, dan dashboard admin yang informatif.",
            'thumbnail'         => null,
            'images'            => null,
            'technologies'      => ['Laravel', 'React', 'MySQL', 'Tailwind CSS', 'Inertia.js'],
            'category'          => 'Web Application',
            'demo_link'         => null,
            'repo_link'         => 'https://github.com/tunggulmajid/library-management',
            'status'            => 'completed',
            'is_featured'       => true,
            'order'             => 1,
            'is_active'         => true,
        ]);

        Project::create([
            'title'             => 'E-Commerce Fashion Store',
            'slug'              => 'ecommerce-fashion-store',
            'short_description' => 'Platform e-commerce untuk toko fashion dengan fitur keranjang belanja, pembayaran, dan manajemen produk.',
            'full_description'  => "Membangun platform e-commerce fashion yang modern menggunakan Laravel sebagai backend dan React untuk frontend.\n\nFitur meliputi katalog produk dengan filter dan pencarian, keranjang belanja, integrasi payment gateway Midtrans, manajemen pesanan, ulasan produk, dan dashboard admin untuk manajemen toko.",
            'thumbnail'         => null,
            'images'            => null,
            'technologies'      => ['Laravel', 'React', 'MySQL', 'Midtrans API', 'Tailwind CSS', 'Redis'],
            'category'          => 'E-Commerce',
            'demo_link'         => null,
            'repo_link'         => 'https://github.com/tunggulmajid/fashion-store',
            'status'            => 'completed',
            'is_featured'       => true,
            'order'             => 2,
            'is_active'         => true,
        ]);

        Project::create([
            'title'             => 'Aplikasi Manajemen Tugas',
            'slug'              => 'aplikasi-manajemen-tugas',
            'short_description' => 'Aplikasi kolaborasi tim untuk manajemen tugas dan proyek dengan tampilan kanban board.',
            'full_description'  => "Mengembangkan aplikasi manajemen tugas berbasis web yang terinspirasi dari Trello. Dibangun dengan Laravel dan Vue.js dengan fitur real-time collaboration menggunakan Pusher.\n\nFitur meliputi kanban board drag-and-drop, manajemen anggota tim, lampiran file, komentar pada tugas, notifikasi real-time, dan laporan progres proyek.",
            'thumbnail'         => null,
            'images'            => null,
            'technologies'      => ['Laravel', 'Vue.js', 'MySQL', 'Pusher', 'Tailwind CSS'],
            'category'          => 'Web Application',
            'demo_link'         => null,
            'repo_link'         => 'https://github.com/tunggulmajid/task-manager',
            'status'            => 'completed',
            'is_featured'       => true,
            'order'             => 3,
            'is_active'         => true,
        ]);

        Project::create([
            'title'             => 'Website Profil Perusahaan',
            'slug'              => 'website-profil-perusahaan',
            'short_description' => 'Website profil perusahaan yang modern dan responsif dengan CMS untuk manajemen konten.',
            'full_description'  => "Membangun website profil perusahaan yang profesional dengan antarmuka modern dan CMS (Content Management System) yang mudah digunakan.\n\nWebsite dilengkapi dengan halaman layanan, portofolio, blog, dan form kontak. Admin dapat mengelola semua konten melalui dashboard yang intuitif tanpa perlu keahlian teknis.",
            'thumbnail'         => null,
            'images'            => null,
            'technologies'      => ['Laravel', 'Livewire', 'MySQL', 'Alpine.js', 'Tailwind CSS'],
            'category'          => 'Company Profile',
            'demo_link'         => null,
            'repo_link'         => null,
            'status'            => 'completed',
            'is_featured'       => false,
            'order'             => 4,
            'is_active'         => true,
        ]);

        Project::create([
            'title'             => 'Sistem Absensi Online',
            'slug'              => 'sistem-absensi-online',
            'short_description' => 'Sistem absensi karyawan berbasis web dengan fitur geolocation dan laporan kehadiran.',
            'full_description'  => "Membangun sistem absensi karyawan online yang modern dengan validasi lokasi menggunakan GPS geolocation.\n\nKaryawan dapat melakukan absen masuk dan keluar melalui browser smartphone. Sistem mencatat koordinat GPS untuk validasi lokasi. Admin dapat melihat laporan kehadiran, rekap lembur, dan ekspor data ke Excel.",
            'thumbnail'         => null,
            'images'            => null,
            'technologies'      => ['Laravel', 'React', 'MySQL', 'Google Maps API', 'Tailwind CSS'],
            'category'          => 'Web Application',
            'demo_link'         => null,
            'repo_link'         => 'https://github.com/tunggulmajid/attendance-system',
            'status'            => 'in_progress',
            'is_featured'       => false,
            'order'             => 5,
            'is_active'         => true,
        ]);

        Project::create([
            'title'             => 'API Blog Platform',
            'slug'              => 'api-blog-platform',
            'short_description' => 'RESTful API untuk platform blog dengan autentikasi JWT, manajemen artikel, dan kategori.',
            'full_description'  => "Membangun RESTful API untuk platform blogging menggunakan Laravel dengan autentikasi JWT yang aman.\n\nAPI mendukung manajemen artikel dengan rich text editor, kategori dan tag, komentar bersarang, pencarian full-text, upload gambar ke cloud storage, dan rate limiting untuk keamanan.",
            'thumbnail'         => null,
            'images'            => null,
            'technologies'      => ['Laravel', 'MySQL', 'JWT', 'REST API', 'PHP'],
            'category'          => 'API',
            'demo_link'         => null,
            'repo_link'         => 'https://github.com/tunggulmajid/blog-api',
            'status'            => 'completed',
            'is_featured'       => false,
            'order'             => 6,
            'is_active'         => true,
        ]);
    }
}
