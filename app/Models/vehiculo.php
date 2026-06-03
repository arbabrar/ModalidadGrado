<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class vehiculo extends Model
{
    use HasFactory;
    protected $table = 'vehiculos';

    protected $fillable = [
        'placa', 'clase', 'color', 'modelo', 'marca', 'tipo'
    ];

    public function lavados()
    {
        return $this->hasMany(Lavado::class, 'id_vehiculo');
    }
}
