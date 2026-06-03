<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class productos_servicio extends Model
{
    use HasFactory;
    protected $table = 'producto_servicio';
     protected $fillable = [
       'id_lavado',
       'id_producto',
       'costo',
       'fecha',
       'cancelado',
       'id_pago',
       'id_operacion'
   ];

   /**
    * Relación con el modelo Lavado
    */
   public function lavado()
   {
       return $this->belongsTo(Lavado::class, 'id_lavado');
   }

   /**
    * Relación con el modelo Producto
    */
   public function producto()
   {
       return $this->belongsTo(Producto::class, 'id_producto');
   }

   /**
    * Relación con el modelo Pago
    */
   public function pago()
   {
       return $this->belongsTo(Pago::class, 'id_pago');
   }

   /**
    * Relación con el modelo Operacion
    */
   public function operacion()
   {
       return $this->belongsTo(Operacion::class, 'id_operacion');
   }

   public static function getProductoServicioId($idservicio,$id_operacion){
     return DB::table('producto_servicio')
          ->join('productos','productos.id','=','producto_servicio.id_producto')
          ->select('producto_servicio.id as id','nombreproducto','producto_servicio.costo' )
          ->where('id_lavado','=',$idservicio)
          ->where('producto_servicio.id_operacion','=',$id_operacion)->get();
   }

   public static function setPagado($idlavado, $idpago){
     $productos = DB::table('producto_servicio')
                 ->select('id')
                 ->where('id_lavado','=',$idlavado)
                 ->where('id_operacion','=',1)
                 ->get();
     foreach ($productos as $producto) {
       DB::table('producto_servicio')
        ->where('id', '=', $producto->id)
        ->update([
             'id_operacion' => 2,
             'id_pago' => $idpago
         ]);
     }

     return true;
   }
}
