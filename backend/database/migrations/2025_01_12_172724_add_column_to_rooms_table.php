<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up() {
        Schema::table('rooms', function (Blueprint $table) {
            // Add new columns
            $table->integer('baths')->nullable();
            $table->decimal('area', 8, 2)->nullable(); 
            $table->integer('guests')->nullable(); 
            $table->integer('bathrooms')->nullable(); 
        });
    }

    public function down() {
        Schema::table('rooms', function (Blueprint $table) {
            // Drop the columns if we rollback the migration
            $table->dropColumn('baths');
            $table->dropColumn('area');
            $table->dropColumn('guests');
            $table->dropColumn('bathrooms');
        });
    }
};
