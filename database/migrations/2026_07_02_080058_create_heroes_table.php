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
        Schema::create('heroes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('tagline');
            $table->text('description');
            $table->string('profile_image')->nullable();
            $table->string('cv_file')->nullable();
            $table->string('cta_primary_text')->default('View My Work');
            $table->string('cta_primary_link')->default('#projects');
            $table->string('cta_secondary_text')->default('Download CV');
            $table->string('cta_secondary_link')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('heroes');
    }
};
