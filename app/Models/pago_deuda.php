<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pago_deuda extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_deuda', 'id_personal', 'fecha_pago', 'monto_pagado', 'metodo_pago', 'estado',
    ];

    // Relación de pago con cliente
    public function personal()
    {
        return $this->belongsTo(Cliente::class, 'id_personal');
    }

    // Relación de pago con deuda
    public function deuda()
    {
        return $this->belongsTo(Deuda::class, 'id_deuda');
    }
}
