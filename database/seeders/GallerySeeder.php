<?php

namespace Database\Seeders;

use App\Models\Gallery;
use App\Models\GalleryCategory;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        Gallery::truncate();

        $awards   = GalleryCategory::where('category_name', 'Awards')->first();
        $activity = GalleryCategory::where('category_name', 'Activities')->first();
        $officers = GalleryCategory::where('category_name', 'Officers and Staff')->first();
        $seminars = GalleryCategory::where('category_name', 'Seminars / Training / Educational Tours')->first();

        $items = [
            // Awards - pictures c/o ed
            [
                'gallery_category_id' => $awards?->id,
                'title'       => 'Awards',
                'description' => 'Photos coming soon.',
                'year'        => '2024-01-01',
                'image'       => null,
            ],
            // Activities
            [
                'gallery_category_id' => $activity?->id,
                'title'       => '25th "Silver" Anniversary',
                'description' => '25th Silver Anniversary celebration with video presentation.',
                'year'        => '2024-01-01',
                'image'       => null,
            ],
            [
                'gallery_category_id' => $activity?->id,
                'title'       => 'Tree / Mangrove Planting',
                'description' => 'BOPE MPC tree and mangrove planting activity in support of environmental conservation.',
                'year'        => '2023-01-01',
                'image'       => null,
            ],
            [
                'gallery_category_id' => $activity?->id,
                'title'       => 'Coastal Clean-up',
                'description' => 'Coastal clean-up drive organized by BOPE MPC officers and members.',
                'year'        => '2023-01-01',
                'image'       => null,
            ],
            [
                'gallery_category_id' => $activity?->id,
                'title'       => 'Community Outreach',
                'description' => 'Community outreach program providing assistance to those in need.',
                'year'        => '2023-01-01',
                'image'       => null,
            ],
            // Officers and Staff
            [
                'gallery_category_id' => $officers?->id,
                'title'       => 'Officers and Staff',
                'description' => 'Photos coming soon.',
                'year'        => '2024-01-01',
                'image'       => null,
            ],
            // Seminars / Training / Educational Tours
            [
                'gallery_category_id' => $seminars?->id,
                'title'       => 'Mental Health Seminar',
                'description' => 'Mental health seminar for BOPE MPC officers and staff.',
                'year'        => '2024-01-01',
                'image'       => null,
            ],
            [
                'gallery_category_id' => $seminars?->id,
                'title'       => 'Basic Life Support Training',
                'description' => 'Basic Life Support (BLS) training for BOPE MPC members.',
                'year'        => '2024-01-01',
                'image'       => null,
            ],
        ];

        foreach ($items as $item) {
            if ($item['gallery_category_id']) {
                Gallery::create($item);
            }
        }
    }
}
