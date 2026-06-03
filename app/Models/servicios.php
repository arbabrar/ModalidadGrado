<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class servicios extends Model
{
    use HasFactory;

    protected $table = 'servicios';

    protected $fillable = ['tipo', 'costo'];

    public function lavadoServicios()
    {
        return $this->hasMany(LavadoServicio::class, 'id_servicio');
    }
}
