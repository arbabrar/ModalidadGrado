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
        Schema::create('lavado_servicio', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_lavado')->constrained('lavados');
            $table->foreignId('id_servicio')->constrained('servicios');
            $table->double('costo', 8, 2); // Costo del servicio
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lavado_servicio');
    }
};
