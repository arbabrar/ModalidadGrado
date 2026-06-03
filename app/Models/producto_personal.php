<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class producto_personal extends Model
{
    use HasFactory;

    protected $table = 'producto_personal';
    protected $fillable = [
       'id_personal',
       'id_producto',
       'costo',
       'cancelado',
       'id_operacion',
       'fecha',
       'fecha_pago'
   ];

   // Relación con el modelo Personal (uno a muchos inverso)
   public function personal()
   {
       return $this->belongsTo(Personal::class, 'id_personal');
   }

   // Relación con el modelo Producto (uno a muchos inverso)
   public function producto()
   {
       return $this->belongsTo(Producto::class, 'id_producto');
   }

   // Relación con el modelo Operacion (uno a muchos inverso)
   public function operacion()
   {
       return $this->belongsTo(Operacion::class, 'id_operacion');
   }

   // Función para marcar el producto como cancelado
   public function cancelar()
   {
       $this->cancelado = true;
       $this->save();
   }
}
