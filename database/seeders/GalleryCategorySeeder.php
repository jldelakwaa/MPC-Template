<?php

namespace Database\Seeders;

use App\Models\GalleryCategory;
use Illuminate\Database\Seeder;

class GalleryCategorySeeder extends Seeder
{
    public function run(): void
    {
        // Remove old placeholder categories
        GalleryCategory::whereIn('category_name', [
            'General Assembly',
            'Community Events',
            'Awards & Recognition',
            'Training & Seminars',
            'Cooperative Projects',
        ])->delete();

        $categories = [
            ['category_name' => 'Awards'],
            ['category_name' => 'Activities'],
            ['category_name' => 'Officers and Staff'],
            ['category_name' => 'Seminars / Training / Educational Tours'],
        ];

        foreach ($categories as $category) {
            GalleryCategory::firstOrCreate(['category_name' => $category['category_name']]);
        }
    }
}
