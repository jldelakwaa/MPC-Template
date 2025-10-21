<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('officers')) {
        Schema::create('officers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('officer_category_id')->nullable()->constrained()->onDelete('set null');
            $table->string('name');
            $table->string('position');
            $table->date('birthday');
            $table->date('yearservice');
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('officers');
    }
};
