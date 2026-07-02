<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hero extends Model
{
    protected $fillable = [
        'name',
        'tagline',
        'description',
        'profile_image',
        'cv_file',
        'cta_primary_text',
        'cta_primary_link',
        'cta_secondary_text',
        'cta_secondary_link',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function getProfileImageUrlAttribute(): ?string
    {
        return $this->profile_image ? asset('storage/' . $this->profile_image) : null;
    }

    public function getCvFileUrlAttribute(): ?string
    {
        return $this->cv_file ? asset('storage/' . $this->cv_file) : null;
    }

    public static function getActive(): ?self
    {
        return self::where('is_active', true)->first();
    }
}
