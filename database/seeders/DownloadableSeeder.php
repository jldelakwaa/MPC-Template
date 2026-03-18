<?php

namespace Database\Seeders;

use App\Models\Downloadable;
use App\Models\DownloadableCategory;
use Illuminate\Database\Seeder;

class DownloadableSeeder extends Seeder
{
    public function run(): void
    {
        $loanCat     = DownloadableCategory::where('category_name', 'Loan Forms')->first();
        $memberCat   = DownloadableCategory::where('category_name', 'Membership Forms')->first();
        $savingsCat  = DownloadableCategory::where('category_name', 'Savings & Deposit Forms')->first();
        $reportsCat  = DownloadableCategory::where('category_name', 'Annual Reports')->first();
        $policyCat   = DownloadableCategory::where('category_name', 'Policies & Guidelines')->first();

        $items = [
            // Loan Forms
            [
                'downloadable_category_id' => $loanCat?->id,
                'title'             => 'Regular Loan Application Form',
                'downloadable_form' => null,
            ],
            [
                'downloadable_category_id' => $loanCat?->id,
                'title'             => 'Emergency Loan Application Form',
                'downloadable_form' => null,
            ],
            [
                'downloadable_category_id' => $loanCat?->id,
                'title'             => 'Educational Loan Application Form',
                'downloadable_form' => null,
            ],
            [
                'downloadable_category_id' => $loanCat?->id,
                'title'             => 'Housing Loan Application Form',
                'downloadable_form' => null,
            ],
            [
                'downloadable_category_id' => $loanCat?->id,
                'title'             => 'Livelihood Loan Application Form',
                'downloadable_form' => null,
            ],
            // Membership Forms
            [
                'downloadable_category_id' => $memberCat?->id,
                'title'             => 'Membership Application Form',
                'downloadable_form' => null,
            ],
            [
                'downloadable_category_id' => $memberCat?->id,
                'title'             => 'Membership Update / Amendment Form',
                'downloadable_form' => null,
            ],
            [
                'downloadable_category_id' => $memberCat?->id,
                'title'             => 'Beneficiary Designation Form',
                'downloadable_form' => null,
            ],
            // Savings & Deposit Forms
            [
                'downloadable_category_id' => $savingsCat?->id,
                'title'             => 'Savings Account Opening Form',
                'downloadable_form' => null,
            ],
            [
                'downloadable_category_id' => $savingsCat?->id,
                'title'             => 'Withdrawal Slip',
                'downloadable_form' => null,
            ],
            [
                'downloadable_category_id' => $savingsCat?->id,
                'title'             => 'Time Deposit Application Form',
                'downloadable_form' => null,
            ],
            // Annual Reports
            [
                'downloadable_category_id' => $reportsCat?->id,
                'title'             => 'Annual Report 2024',
                'downloadable_form' => null,
            ],
            [
                'downloadable_category_id' => $reportsCat?->id,
                'title'             => 'Annual Report 2023',
                'downloadable_form' => null,
            ],
            // Policies & Guidelines
            [
                'downloadable_category_id' => $policyCat?->id,
                'title'             => 'Cooperative By-Laws',
                'downloadable_form' => null,
            ],
            [
                'downloadable_category_id' => $policyCat?->id,
                'title'             => 'Loan Policy Manual',
                'downloadable_form' => null,
            ],
        ];

        foreach ($items as $item) {
            if ($item['downloadable_category_id']) {
                Downloadable::firstOrCreate(
                    ['title' => $item['title'], 'downloadable_category_id' => $item['downloadable_category_id']],
                    $item
                );
            }
        }
    }
}
