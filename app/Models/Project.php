<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class Project extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'full_description',
        'thumbnail',
        'images',
        'technologies',
        'category',
        'year',
        'demo_link',
        'repo_link',
        'status',
        'is_featured',
        'order',
        'is_active',
    ];

    protected $casts = [
        'images'       => 'array',
        'technologies' => 'array',
        'is_featured'  => 'boolean',
        'is_active'    => 'boolean',
        'order'        => 'integer',
        'year'         => 'integer',
    ];

    protected $appends = ['thumbnail_url', 'images_url'];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (self $project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title);
            }
        });
    }

    public function getThumbnailUrlAttribute(): ?string
    {
        return $this->thumbnail ? asset('storage/' . $this->thumbnail) : null;
    }

    public function getImagesUrlAttribute(): array
    {
        if (!$this->images) {
            return [];
        }
        return array_map(fn($img) => asset('storage/' . $img), $this->images);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('order')->orderByDesc('created_at');
    }

    public function scopeByCategory(Builder $query, string $category): Builder
    {
        return $query->where('category', $category);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
