<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $shouldSeedAdmin = app()->environment(['local', 'testing']) || (bool) env('SEED_DEFAULT_ADMIN', false);

        // Seed a default admin only when none exists to avoid duplicate admins after profile email changes.
        if ($shouldSeedAdmin && ! User::query()->where('is_admin', true)->exists()) {
            $adminEmail = env('DEFAULT_ADMIN_EMAIL', 'root@gmail.com');
            $adminPassword = env('DEFAULT_ADMIN_PASSWORD');
            $generatedPassword = $adminPassword ?: Str::password(16);

            $admin = User::firstOrCreate(
                ['email' => $adminEmail],
                [
                    'name'     => 'admin',
                    'password' => Hash::make($generatedPassword),
                    'email_verified_at' => now(),
                    'is_admin' => true,
                ]
            );

            if (! $admin->is_admin) {
                $admin->forceFill(['is_admin' => true])->save();
            }

            if ($this->command && $admin->wasRecentlyCreated && ! $adminPassword) {
                $this->command->warn("Default admin created: {$adminEmail} / {$generatedPassword}");
            }
        }

        $this->call([
            // Categories first (foreign key dependencies)
            OfficerCategorySeeder::class,
            FaqCategorySeeder::class,
            GalleryCategorySeeder::class,
            DownloadableCategorySeeder::class,

            // Content that depends on categories
            OfficerSeeder::class,
            FaqSeeder::class,
            GallerySeeder::class,
            DownloadableSeeder::class,

            // Independent content
            NewsSeeder::class,
            HomePageImageSeeder::class,
        ]);
    }
}
