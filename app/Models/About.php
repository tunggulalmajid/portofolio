<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $fillable = [
        'title',
        'description',
        'short_bio',
        'profile_image',
        'location',
        'email',
        'phone',
        'years_experience',
        'is_available',
        'is_active',
    ];

    protected $casts = [
        'is_available' => 'boolean',
        'is_active'    => 'boolean',
        'years_experience' => 'integer',
    ];

    public function getProfileImageUrlAttribute(): ?string
    {
        return $this->profile_image ? asset('storage/' . $this->profile_image) : null;
    }

    public static function getActive(): ?self
    {
        return self::where('is_active', true)->first();
    }
}
