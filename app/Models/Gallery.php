<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Gallery extends Model
{
    protected $fillable = [
        'title',
        'description',
        'category_id',
        'year',
        'image',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(GalleryCategory::class, 'category_id');
    }
}
