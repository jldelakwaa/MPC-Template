<?php

namespace Database\Seeders;

use App\Models\FaQC;
use App\Models\FaQCategory;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $membership = FaQCategory::where('title', 'Membership')->first();

        $faqs = [
            [
                'faqs_categoryid' => $membership?->id,
                'question' => 'Who can be a member of the cooperative?',
                'answer' => implode("\n", [
                    'Qualification for Regular Membership is open to all employees who:',
                    '- Is gainfully employed or has a stable source of income',
                    '- Has attended and completed the Pre-Membership Education Seminar',
                    '- Must have good moral standing in the Community',
                    '- Subscribed at least a minimum of Two Hundred (200) shares equivalent to Two Hundred Thousand pesos (P200,000.00) payable within ten (10) years',
                    '- Paid the required minimum share capital of Fifty (50) shares amounting to Fifty Thousand (P50,000.00) Pesos, provided said amount shall be fully paid within 1 year, he/she is not considered as full-fledged member',
                    '- Employees of the cooperative who meet internal requirements',
                    '- Former employees or retirees who maintain active cooperative membership',
                    '',
                    'Qualification for Associate Membership is open to any individual who:',
                    '- Is gainfully employed who does not qualify as a regular member',
                    '- Has attended and completed the pre-membership education seminar',
                    '- Must have good moral standing in the community',
                    '- Subscribed at least one hundred (100) shares equivalent to one hundred thousand pesos (P100,000.00) payable within ten (10) years',
                    '- Paid up at least twenty-five (25) shares amounting to Twenty-Five Thousand Pesos (P25,000.00) payable within 1 year, he/she is not considered as full-fledged member',
                ]),
            ],
            [
                'faqs_categoryid' => $membership?->id,
                'question' => 'How to be a member',
                'answer' => implode("\n", [
                    'Registration of Prospective Member-Applicants',
                    '1. Applicant signs his/her intention to join the coop by filling up the Membership Application and Subscription Agreement (MASA) Form',
                    '2. Education and Training Committee schedules PMES and notifies interested applicants',
                    '3. Applicant fills up the membership registration form',
                    '4. Education and Training Committee conducts the PMES as scheduled and issues a certificate of attendance valid for 1 year only from the date of issuance',
                    '',
                    'Application approval process',
                    '1. The Education Committee Chairperson and Board Chairperson shall provisionally approve the application after the applicant has filled-up the Membership Application and Subscription Agreement (MASA) Form',
                    '2. Partially paid at least 1 share (P1,000.00) and membership fee of three hundred (P300.00) pesos only',
                ]),
            ],
        ];

        foreach ($faqs as $faq) {
            if ($faq['faqs_categoryid']) {
                FaQC::firstOrCreate(
                    ['question' => $faq['question']],
                    $faq
                );
            }
        }
    }
}
