<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FaQCategory extends Model
{
    use HasFactory;

    protected $table = 'faqs_category';

    protected $fillable = ['title', 'description'];

    public function faqs(): HasMany
    {
        return $this->hasMany(FaQC::class, 'faqs_categoryid');
    }
}
