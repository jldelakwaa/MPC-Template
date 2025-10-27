<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Downloadable extends Model
{
    protected $table = 'downloadables';

    protected $fillable = [
        'title',
        'downloadable_form',
        'downloadable_category_id',
    ];

    public function category()
    {
        return $this->belongsTo(DownloadableCategory::class, 'downloadable_category_id');
    }
}
