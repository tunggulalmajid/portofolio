<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Experience extends Model
{
    protected $fillable = [
        'company',
        'position',
        'type',
        'location',
        'start_date',
        'end_date',
        'is_current',
        'description',
        'responsibilities',
        'company_logo',
        'order',
        'is_active',
    ];

    protected $casts = [
        'start_date'       => 'date',
        'end_date'         => 'date',
        'is_current'       => 'boolean',
        'is_active'        => 'boolean',
        'responsibilities' => 'array',
        'order'            => 'integer',
    ];

    public function getCompanyLogoUrlAttribute(): ?string
    {
        return $this->company_logo ? asset('storage/' . $this->company_logo) : null;
    }

    public function getDurationAttribute(): string
    {
        $start = $this->start_date->format('M Y');
        $end   = $this->is_current ? 'Present' : ($this->end_date ? $this->end_date->format('M Y') : 'Present');
        return "{$start} - {$end}";
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeWork(Builder $query): Builder
    {
        return $query->where('type', 'work');
    }

    public function scopeEducation(Builder $query): Builder
    {
        return $query->where('type', 'education');
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('order')->orderByDesc('start_date');
    }
}
