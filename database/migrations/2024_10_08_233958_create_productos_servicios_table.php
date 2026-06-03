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
        Schema::create('lavados', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_vehiculo')->constrained('vehiculos');
            $table->foreignId('id_persona')->constrained('personal');
            $table->foreignId('com_personal')->nullable()->constrained('personal');
            $table->string('com_empresa', 150)->nullable();
            $table->foreignId('id_pago')->constrained('pagos');
            $table->boolean('cancelado_personal')->default(false);
            $table->time('hora_salida');
            $table->time('hora_entrada');
            
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lavados');
    }
};
