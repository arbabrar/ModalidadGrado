<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class productos extends Model
{
    use HasFactory;
    protected $table = 'productos';

    protected $fillable = ['nombreproducto', 'unidadMedida', 'cantidad', 'costo'];

    public function productosServicio()
    {
        return $this->hasMany(ProductoServicio::class, 'id_producto');
    }
}
