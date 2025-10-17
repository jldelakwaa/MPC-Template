<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Officer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'officer_category_id',
        'name',
        'position',
        'birthday',
        'yearservice',
        'image',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'birthday' => 'date',
        'yearservice' => 'date',
    ];

    /**
     * Get the category that owns the officer.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(OfficerCategory::class, 'officer_category_id');
    }
}
