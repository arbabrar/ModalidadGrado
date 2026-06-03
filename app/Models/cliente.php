<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class cliente extends Model
{
    use HasFactory;
    protected $table = 'cliente';
    protected $fillable = ['direccion', 'telefono', 'nit'];

    public function naturales()
    {
        return $this->hasOne(natural::class);
    }

    public function juridicos()
    {
        return $this->hasOne(juridico::class);
    }

    public function clienteVehiculos()
    {
        return $this->hasMany(cliente_vehiculo::class);
    }
    
}
