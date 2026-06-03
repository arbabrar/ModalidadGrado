<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pago extends Model
{
    use HasFactory;

    protected $table = 'pagos';

    // Los campos que se pueden asignar masivamente (fillable)
    protected $fillable = [
        'metodo_pago',
        'monto',
        'fecha',
        'razonsocial',
        'nit'
    ];
}
