<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class deuda extends Model
{
    use HasFactory;
    protected $fillable = [
       'id_personal', 'descripcion', 'fecha_generacion', 'monto_total', 'monto_restante', 'estado', 'fecha_vencimiento',
   ];

   // Relación de deuda con cliente
   public function personal()
   {
       return $this->belongsTo(personal::class, 'id_cliente');
   }

   // Relación de deuda con pagos
   public function pagos()
   {
       return $this->hasMany(Pago::class, 'id_deuda');
   }
   public static function getDatoDeuda($idpersonal){
     return self::where('id_personal','=',$idpersonal)
              ->where('estado','=','pendiente')->first();
   }


}
