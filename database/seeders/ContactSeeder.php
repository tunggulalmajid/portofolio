<?php

namespace Database\Seeders;

use App\Models\Contact;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    public function run(): void
    {
        Contact::create([
            'type'      => 'email',
            'label'     => 'Email',
            'value'     => 'tunggulabdulmajid@gmail.com',
            'url'       => 'mailto:tunggulabdulmajid@gmail.com',
            'icon'      => 'envelope',
            'is_active' => true,
            'order'     => 1,
        ]);

        Contact::create([
            'type'      => 'phone',
            'label'     => 'WhatsApp',
            'value'     => '+62 812-3456-7890',
            'url'       => 'https://wa.me/6281234567890',
            'icon'      => 'phone',
            'is_active' => true,
            'order'     => 2,
        ]);

        Contact::create([
            'type'      => 'linkedin',
            'label'     => 'LinkedIn',
            'value'     => 'linkedin.com/in/tunggulmajid',
            'url'       => 'https://linkedin.com/in/tunggulmajid',
            'icon'      => 'linkedin',
            'is_active' => true,
            'order'     => 3,
        ]);

        Contact::create([
            'type'      => 'github',
            'label'     => 'GitHub',
            'value'     => 'github.com/tunggulmajid',
            'url'       => 'https://github.com/tunggulmajid',
            'icon'      => 'github',
            'is_active' => true,
            'order'     => 4,
        ]);

        Contact::create([
            'type'      => 'instagram',
            'label'     => 'Instagram',
            'value'     => '@tunggulmajid',
            'url'       => 'https://instagram.com/tunggulmajid',
            'icon'      => 'instagram',
            'is_active' => true,
            'order'     => 5,
        ]);
    }
}
