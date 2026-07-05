<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Certificate extends Model
{
    protected $fillable = [
        'title',
        'issuer',
        'issue_date',
        'expiry_date',
        'credential_id',
        'credential_url',
        'image',
        'category',
        'order',
        'is_active',
    ];

    protected $casts = [
        'issue_date'  => 'date',
        'expiry_date' => 'date',
        'is_active'   => 'boolean',
        'order'       => 'integer',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    public function getIsExpiredAttribute(): bool
    {
        return $this->expiry_date && $this->expiry_date->isPast();
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder<\App\Models\Certificate> $query
     * @return \Illuminate\Database\Eloquent\Builder<\App\Models\Certificate>
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder<\App\Models\Certificate> $query
     * @return \Illuminate\Database\Eloquent\Builder<\App\Models\Certificate>
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('order')->orderByDesc('issue_date');
    }
}
