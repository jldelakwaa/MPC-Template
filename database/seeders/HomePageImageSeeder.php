<?php

namespace Database\Seeders;

use App\Models\HomePageImage;
use Illuminate\Database\Seeder;

class HomePageImageSeeder extends Seeder
{
    public function run(): void
    {
        $slides = [
            [
                'title'       => 'Empowering Members, Building Community',
                'content'     => 'For over 50 years, we have been dedicated to improving the lives of our members through quality financial services, livelihood programs, and community development initiatives.',
                'image'       => null,
                'button_text' => 'Become a Member',
                'button_link' => '/about/membership',
            ],
            [
                'title'       => 'Affordable Loans for Every Need',
                'content'     => 'From emergency assistance to housing and livelihood, we offer loan products with competitive rates designed to help members achieve their goals.',
                'image'       => null,
                'button_text' => 'View Loan Products',
                'button_link' => '/services/loans',
            ],
            [
                'title'       => 'Grow Your Savings With Us',
                'content'     => 'Your money is safe and earning with our savings programs. Enjoy competitive interest rates and the security of a CDA-registered cooperative.',
                'image'       => null,
                'button_text' => 'Learn About Savings',
                'button_link' => '/services/savings',
            ],
            [
                'title'       => 'Celebrating 50 Years of Service',
                'content'     => 'This golden milestone reflects the trust and commitment of our members and officers who have worked together to build a cooperative that truly serves.',
                'image'       => null,
                'button_text' => 'Our History',
                'button_link' => '/about/history',
            ],
        ];

        foreach ($slides as $slide) {
            HomePageImage::firstOrCreate(
                ['title' => $slide['title']],
                $slide
            );
        }
    }
}
