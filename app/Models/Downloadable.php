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

    protected $appends = ['file_path'];

    /**
     * Accessor for file_path (maps to downloadable_form)
     */
    public function getFilePathAttribute()
    {
        return $this->downloadable_form;
    }

    /**
     * Mutator for file_path (maps to downloadable_form)
     */
    public function setFilePathAttribute($value)
    {
        $this->attributes['downloadable_form'] = $value;
    }

    public function category()
    {
        return $this->belongsTo(DownloadableCategory::class, 'downloadable_category_id');
    }
}
