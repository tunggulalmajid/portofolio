<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Experience extends Model
{
    protected $fillable = [
        'company',
        'position',
        'positions',
        'type',
        'location',
        'start_date',
        'end_date',
        'is_current',
        'description',
        'responsibilities',
        'order',
        'is_active',
    ];

    protected $casts = [
        'start_date'       => 'datetime:Y-m-d',
        'end_date'         => 'datetime:Y-m-d',
        'is_current'       => 'boolean',
        'is_active'        => 'boolean',
        'responsibilities' => 'array',
        'positions'        => 'array',
        'order'            => 'integer',
    ];

    protected $appends = ['duration'];

    public function getDurationAttribute(): string
    {
        if (!$this->start_date) return '';
        
        $start = $this->start_date->format('M Y');
        $end   = $this->end_date ? $this->end_date->format('M Y') : 'Present';
        return "{$start} – {$end}";
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder<\App\Models\Experience> $query
     * @return \Illuminate\Database\Eloquent\Builder<\App\Models\Experience>
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder<\App\Models\Experience> $query
     * @return \Illuminate\Database\Eloquent\Builder<\App\Models\Experience>
     */
    public function scopeWork(Builder $query): Builder
    {
        return $query->where('type', 'work');
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder<\App\Models\Experience> $query
     * @return \Illuminate\Database\Eloquent\Builder<\App\Models\Experience>
     */
    public function scopeEducation(Builder $query): Builder
    {
        return $query->where('type', 'education');
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder<\App\Models\Experience> $query
     * @return \Illuminate\Database\Eloquent\Builder<\App\Models\Experience>
     */
    public function scopeOrganization(Builder $query): Builder
    {
        return $query->where('type', 'organization');
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder<\App\Models\Experience> $query
     * @return \Illuminate\Database\Eloquent\Builder<\App\Models\Experience>
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('order')->orderByDesc('start_date');
    }
}
