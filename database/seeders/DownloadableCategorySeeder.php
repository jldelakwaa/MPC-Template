<?php

namespace Database\Seeders;

use App\Models\DownloadableCategory;
use Illuminate\Database\Seeder;

class DownloadableCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'category_name' => 'Loan Forms',
                'description'   => 'Application forms and requirements for all loan products.',
            ],
            [
                'category_name' => 'Membership Forms',
                'description'   => 'Forms required for membership application and related transactions.',
            ],
            [
                'category_name' => 'Savings & Deposit Forms',
                'description'   => 'Forms for savings account opening, withdrawal, and time deposit transactions.',
            ],
            [
                'category_name' => 'Annual Reports',
                'description'   => 'Yearly financial statements and performance reports of the cooperative.',
            ],
            [
                'category_name' => 'Policies & Guidelines',
                'description'   => 'Official policies, by-laws, and operational guidelines of the cooperative.',
            ],
        ];

        foreach ($categories as $category) {
            DownloadableCategory::firstOrCreate(
                ['category_name' => $category['category_name']],
                $category
            );
        }
    }
}
