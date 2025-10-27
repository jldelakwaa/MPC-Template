<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsUpdate extends Model
{
    protected $table = 'news_update';

    protected $fillable = [
        'title',
        'content',
        'year',
        'image',
    ];

    public function newsDetails()
    {
        return $this->hasMany(NewsDetail::class);
    }
}
