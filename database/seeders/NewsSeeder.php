<?php

namespace Database\Seeders;

use App\Models\NewsDetail;
use App\Models\NewsUpdate;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        $news = [
            [
                'title'   => 'Cooperative Celebrates 50 Years of Service',
                'content' => 'This year marks a golden milestone as our cooperative celebrates 50 years of empowering members and serving the community. From humble beginnings, we have grown into a strong multi-purpose cooperative with thousands of members and diverse business ventures that continue to improve the lives of our members and their families.',
                'year'    => 2025,
                'image'   => null,
                'details' => [
                    [
                        'content'   => 'The 50th Anniversary celebration will feature a grand general assembly, cultural presentations, and a thanksgiving mass. Officers and members who have contributed significantly to the cooperative\'s growth will be recognized during the event.',
                        'pdf_files' => null,
                    ],
                    [
                        'content'   => 'As part of the anniversary, the cooperative will launch new member benefits including an enhanced hospitalization assistance program and an expanded scholarship fund for members\' dependents.',
                        'pdf_files' => null,
                    ],
                ],
            ],
            [
                'title'   => 'New Loan Products Now Available for 2025',
                'content' => 'We are pleased to announce the launch of two new loan products designed to better serve the financial needs of our members. The new Quick Cash Loan and the Agricultural Livelihood Loan are now open for applications effective January 2025.',
                'year'    => 2025,
                'image'   => null,
                'details' => [
                    [
                        'content'   => 'The Quick Cash Loan offers up to ₱50,000 with a simplified application process and approval within 3 working days. This loan is designed for emergency and urgent financial needs.',
                        'pdf_files' => null,
                    ],
                    [
                        'content'   => 'The Agricultural Livelihood Loan supports members engaged in farming and agricultural activities with a maximum loanable amount of ₱200,000 at preferential rates.',
                        'pdf_files' => null,
                    ],
                ],
            ],
            [
                'title'   => 'Annual General Assembly Results — Board Members Elected',
                'content' => 'The 49th Annual General Assembly was successfully held last January 2024. Members approved the annual report, audited financial statements, and elected new members of the Board of Directors and the Audit and Election Committees.',
                'year'    => 2024,
                'image'   => null,
                'details' => [
                    [
                        'content'   => 'The General Assembly approved a net surplus distribution of ₱5.2 million, with patronage refunds released to all active members based on their loan and savings transactions for the year.',
                        'pdf_files' => null,
                    ],
                ],
            ],
            [
                'title'   => 'Aqua BOPE Expands to Two New Locations',
                'content' => 'The cooperative\'s Aqua BOPE venture, Aqua BOPE, is expanding to two new locations within the community. This expansion aims to provide more residents with access to affordable, clean, and safe drinking water.',
                'year'    => 2024,
                'image'   => null,
                'details' => [],
            ],
            [
                'title'   => 'CDA Accreditation Successfully Renewed',
                'content' => 'The cooperative has successfully renewed its Certificate of Registration and Accreditation with the Cooperative Development Authority (CDA). This renewal confirms our compliance with all regulatory requirements and our commitment to cooperative principles.',
                'year'    => 2024,
                'image'   => null,
                'details' => [],
            ],
            [
                'title'   => 'Financial Literacy Program for Members',
                'content' => 'The Education, Training, and Cultural Committee is launching a series of financial literacy seminars for all members. Sessions will cover personal budgeting, responsible borrowing, savings strategies, and understanding your cooperative shares.',
                'year'    => 2023,
                'image'   => null,
                'details' => [
                    [
                        'content'   => 'Seminars will be held on the first Saturday of each month at the cooperative\'s training room. Attendance is free for all members. Download the schedule from the Downloads section of this website.',
                        'pdf_files' => null,
                    ],
                ],
            ],
        ];

        foreach ($news as $item) {
            $details = $item['details'];
            unset($item['details']);

            $newsRecord = NewsUpdate::firstOrCreate(
                ['title' => $item['title']],
                $item
            );

            foreach ($details as $detail) {
                NewsDetail::firstOrCreate(
                    ['news_update_id' => $newsRecord->id, 'content' => $detail['content']],
                    array_merge($detail, ['news_update_id' => $newsRecord->id])
                );
            }
        }
    }
}
