<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('membership_plans', function (Blueprint $table) {
            $table->id('membership_plan_id'); // Unique identifier for each plan, INT and Primary Key
            $table->string('plan_name', 50); // VARCHAR(50) for plan name
            $table->integer('duration_months'); // INT for duration in months
            $table->decimal('price', 10, 2); // DECIMAL(10, 2) for price
            $table->text('description')->nullable(); // TEXT for description, nullable for optional field
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('membership_plans');
    }
};
