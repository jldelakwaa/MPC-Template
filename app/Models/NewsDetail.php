<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsDetail extends Model
{

     protected $table = 'news_details';

    protected $fillable = [
        'news_update_id',
        'content',
        'pdf_files',
    ];

    public function newsUpdate()
    {
        return $this->belongsTo(NewsUpdate::class);
    }

}
