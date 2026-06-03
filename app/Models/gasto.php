<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class gasto extends Model
{
    use HasFactory;
    // Definimos la tabla asociada a este modelo (opcional si el nombre del modelo sigue la convención)
    protected $table = 'gastos';

    // Los atributos que se pueden asignar de forma masiva
    protected $fillable = [
        'id_personal',
        'detalle',
        'fecha',
        'monto',
        'nro_factura',
        'proveedor',
        'metodo_pago'
    ];

    // Relación con el modelo Personal
    public function personal()
    {
        return $this->belongsTo(Personal::class, 'id_personal');
    }
}
