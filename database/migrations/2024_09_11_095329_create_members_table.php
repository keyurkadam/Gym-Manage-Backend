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
        Schema::create('members', function (Blueprint $table) {
            $table->id();                   // Primary key
            $table->string('first_name', 50);          // First name
            $table->string('last_name', 50);           // Last name
            $table->date('date_of_birth');             // Date of birth
            $table->string('email', 100)->unique();    // Email (unique)
            $table->string('phone_number', 15);        // Phone number
            $table->string('address', 255);            // Address
            $table->unsignedBigInteger('membership_plan_id');  // Foreign key for Membership plan
            $table->date('join_date');                 // Join date
            $table->enum('status', ['active', 'inactive', 'expired']); // Membership status
            $table->timestamps();   

            $table->foreign('membership_plan_id')->references('membership_plan_id')->on('membership_plans')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('members');
    }
};
