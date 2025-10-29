<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DownloadableCategory extends Model
{
    protected $table = 'downloadable_categories';

    protected $fillable = ['category_name','description'];


    public function downloadables()
    {
        return $this->hasMany(Downloadable::class, 'downloadable_category_id');
    }

}
