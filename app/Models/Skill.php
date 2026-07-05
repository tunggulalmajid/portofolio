<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Skill extends Model
{
    protected $fillable = [
        'name',
        'category',
        'icon_name',
        'color',
        'order',
        'is_active',
    ];

    protected $casts = [
        'order'     => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * @param \Illuminate\Database\Eloquent\Builder<\App\Models\Skill> $query
     * @return \Illuminate\Database\Eloquent\Builder<\App\Models\Skill>
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder<\App\Models\Skill> $query
     * @return \Illuminate\Database\Eloquent\Builder<\App\Models\Skill>
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('order')->orderBy('name');
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder<\App\Models\Skill> $query
     * @param string $category
     * @return \Illuminate\Database\Eloquent\Builder<\App\Models\Skill>
     */
    public function scopeByCategory(Builder $query, string $category): Builder
    {
        return $query->where('category', $category);
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public static function getGroupedByCategory(): array
    {
        return self::active()
            ->ordered()
            ->get()
            ->groupBy('category')
            ->toArray();
    }
}
