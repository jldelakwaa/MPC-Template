<?php

namespace Database\Seeders;

use App\Models\FaQCategory;
use Illuminate\Database\Seeder;

class FaqCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'title'       => 'Membership',
                'description' => 'Questions about joining and membership requirements.',
            ],
        ];

        foreach ($categories as $category) {
            FaQCategory::firstOrCreate(['title' => $category['title']], $category);
        }
    }
}
