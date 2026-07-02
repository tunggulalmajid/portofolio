<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Skill extends Model
{
    protected $fillable = [
        'name',
        'category',
        'proficiency',
        'icon',
        'color',
        'order',
        'is_active',
    ];

    protected $casts = [
        'proficiency' => 'integer',
        'order'       => 'integer',
        'is_active'   => 'boolean',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('order')->orderBy('name');
    }

    public function scopeByCategory(Builder $query, string $category): Builder
    {
        return $query->where('category', $category);
    }

    public static function getGroupedByCategory(): array
    {
        return self::active()
            ->ordered()
            ->get()
            ->groupBy('category')
            ->toArray();
    }
}
