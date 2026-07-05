<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Contact extends Model
{
    protected $fillable = [
        'type',
        'label',
        'value',
        'url',
        'icon',
        'is_active',
        'order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order'     => 'integer',
    ];

    /**
     * @param \Illuminate\Database\Eloquent\Builder<\App\Models\Contact> $query
     * @return \Illuminate\Database\Eloquent\Builder<\App\Models\Contact>
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder<\App\Models\Contact> $query
     * @return \Illuminate\Database\Eloquent\Builder<\App\Models\Contact>
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('order');
    }
}
