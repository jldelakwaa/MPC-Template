<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomePageImage extends Model
{
    protected $table = 'homepage_images';

    protected $fillable = [
        'title',
        'image',
        'content',
        'button_link',
        'button_text',
    ];
}
