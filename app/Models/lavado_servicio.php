<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class lavado_servicio extends Model
{
    use HasFactory;
    // Definimos el nombre de la tabla en caso no siga la convención plural
    protected $table = 'lavado_servicio';

    // Definimos los campos que son asignables masivamente
    protected $fillable = [
        'id_lavado',
        'id_servicio',
        'costo',
        'id_operacion',
        'cancelado_personal',
        'fecha_pago_personal'
    ];

    /**
     * Relación con el modelo Lavado
     */
    public function lavado()
    {
        return $this->belongsTo(lavado::class, 'id_lavado');
    }

    /**
     * Relación con el modelo Servicio
     */
    public function servicio()
    {
        return $this->belongsTo(servicios::class, 'id_servicio');
    }

    /**
     * Relación con el modelo Operacion
     */
    public function operacion()
    {
        return $this->belongsTo(operacion::class, 'id_operacion');
    }

    public static function getTipoServiciosId($idservicio,$id_operacion){
      return DB::table('lavado_servicio')
           ->join('servicios','servicios.id','=','lavado_servicio.id_servicio')
           ->select('lavado_servicio.id as id','tipo','lavado_servicio.costo' )
           ->where('id_lavado','=',$idservicio)
           ->where('lavado_servicio.id_operacion','=',$id_operacion)->get();
    }
    public static function setPagado($idlavado){
      $servicios = DB::table('lavado_servicio')
                  ->select('id')
                  ->where('id_lavado','=',$idlavado)
                  ->where('id_operacion','=',1)
                  ->get();
      foreach ($servicios as $servicio) {
        DB::table('lavado_servicio')
         ->where('id', '=', $servicio->id)
         ->update(['id_operacion' => 2]);
      }

      return true;
    }
}
