<?php

namespace Database\Seeders;

use App\Models\OfficerCategory;
use Illuminate\Database\Seeder;

class OfficerCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name'        => 'Board of Directors',
                'description' => 'The governing body responsible for the overall direction and policy of the cooperative.',
            ],
            [
                'name'        => 'Audit Committee',
                'description' => 'Responsible for overseeing the financial reporting process, internal controls, and audit activities.',
            ],
            [
                'name'        => 'Election Committee',
                'description' => 'Ensures fair and transparent elections for cooperative leadership positions.',
            ],
            [
                'name'        => 'Management',
                'description' => 'The executive team responsible for the day-to-day operations of the cooperative.',
            ],
        ];

        foreach ($categories as $category) {
            OfficerCategory::firstOrCreate(['name' => $category['name']], $category);
        }
    }
}
