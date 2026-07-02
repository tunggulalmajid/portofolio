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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('short_description');
            $table->longText('full_description');
            $table->string('thumbnail')->nullable();
            $table->json('images')->nullable();
            $table->json('technologies');
            $table->string('category');
            $table->string('demo_link')->nullable();
            $table->string('repo_link')->nullable();
            $table->enum('status', ['completed', 'in_progress', 'archived'])->default('completed');
            $table->boolean('is_featured')->default(false);
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
