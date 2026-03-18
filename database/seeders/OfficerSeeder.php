<?php

namespace Database\Seeders;

use App\Models\Officer;
use App\Models\OfficerCategory;
use Illuminate\Database\Seeder;

class OfficerSeeder extends Seeder
{
    public function run(): void
    {
        $bod    = OfficerCategory::where('name', 'Board of Directors')->first();
        $audit  = OfficerCategory::where('name', 'Audit Committee')->first();
        $elect  = OfficerCategory::where('name', 'Election Committee')->first();
        $mgmt   = OfficerCategory::where('name', 'Management')->first();

        $officers = [
            // Board of Directors
            [
                'officer_category_id' => $bod?->id,
                'name'        => 'Juan dela Cruz',
                'position'    => 'Chairperson',
                'birthday'    => '1968-03-15',
                'yearservice' => '2010-01-01',
                'image'       => null,
            ],
            [
                'officer_category_id' => $bod?->id,
                'name'        => 'Maria Santos',
                'position'    => 'Vice Chairperson',
                'birthday'    => '1972-07-22',
                'yearservice' => '2012-01-01',
                'image'       => null,
            ],
            [
                'officer_category_id' => $bod?->id,
                'name'        => 'Pedro Reyes',
                'position'    => 'Secretary',
                'birthday'    => '1975-11-05',
                'yearservice' => '2015-01-01',
                'image'       => null,
            ],
            [
                'officer_category_id' => $bod?->id,
                'name'        => 'Ana Gonzales',
                'position'    => 'Treasurer',
                'birthday'    => '1970-04-18',
                'yearservice' => '2013-01-01',
                'image'       => null,
            ],
            [
                'officer_category_id' => $bod?->id,
                'name'        => 'Ramon Villanueva',
                'position'    => 'Director',
                'birthday'    => '1965-09-30',
                'yearservice' => '2011-01-01',
                'image'       => null,
            ],
            // Audit Committee
            [
                'officer_category_id' => $audit?->id,
                'name'        => 'Lourdes Bautista',
                'position'    => 'Chairperson',
                'birthday'    => '1971-02-14',
                'yearservice' => '2016-01-01',
                'image'       => null,
            ],
            [
                'officer_category_id' => $audit?->id,
                'name'        => 'Carlos Mendoza',
                'position'    => 'Member',
                'birthday'    => '1978-08-20',
                'yearservice' => '2018-01-01',
                'image'       => null,
            ],
            // Election Committee
            [
                'officer_category_id' => $elect?->id,
                'name'        => 'Gloria Fernandez',
                'position'    => 'Chairperson',
                'birthday'    => '1969-06-11',
                'yearservice' => '2014-01-01',
                'image'       => null,
            ],
            [
                'officer_category_id' => $elect?->id,
                'name'        => 'Roberto Castro',
                'position'    => 'Member',
                'birthday'    => '1980-12-03',
                'yearservice' => '2019-01-01',
                'image'       => null,
            ],
            // Management
            [
                'officer_category_id' => $mgmt?->id,
                'name'        => 'Esperanza Ramos',
                'position'    => 'General Manager',
                'birthday'    => '1973-05-25',
                'yearservice' => '2008-01-01',
                'image'       => null,
            ],
            [
                'officer_category_id' => $mgmt?->id,
                'name'        => 'Felix Torres',
                'position'    => 'Accountant',
                'birthday'    => '1982-10-17',
                'yearservice' => '2017-01-01',
                'image'       => null,
            ],
        ];

        foreach ($officers as $officer) {
            if ($officer['officer_category_id']) {
                Officer::firstOrCreate(
                    ['name' => $officer['name'], 'officer_category_id' => $officer['officer_category_id']],
                    $officer
                );
            }
        }
    }
}
