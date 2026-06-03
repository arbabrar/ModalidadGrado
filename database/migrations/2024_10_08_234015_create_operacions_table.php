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
        Schema::create('producto_servicio', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_lavado')->constrained('lavados');
            $table->foreignId('id_producto')->constrained('productos');
            $table->decimal('costo', 8, 2);
            $table->date('fecha');
            $table->boolean('cancelado')->default(false);
            $table->foreignId('id_pago')->constrained('pagos');
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
