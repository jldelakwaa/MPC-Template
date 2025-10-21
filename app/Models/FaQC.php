<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FaQC extends Model
{
    use HasFactory;

    protected $table = 'faqs';

  protected $fillable = [
  'faqs_categoryid',
  'question',
  'answer',



 ];
 public function faqCategory(): BelongsTo
    {
        return $this->belongsTo(FaQCategory::class, 'faqs_categoryid');
    }
}
