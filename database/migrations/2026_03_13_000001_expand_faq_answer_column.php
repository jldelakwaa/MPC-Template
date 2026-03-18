<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasTable('faqs')) {
            return;
        }

        // Avoid doctrine/dbal dependency by using raw SQL.
        DB::statement('ALTER TABLE faqs MODIFY answer TEXT NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasTable('faqs')) {
            return;
        }

        DB::statement('ALTER TABLE faqs MODIFY answer VARCHAR(255) NULL');
    }
};
