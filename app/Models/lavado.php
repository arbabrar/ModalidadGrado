<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class lavado extends Model
{
    use HasFactory;
    protected $table = 'lavados';

    protected $fillable = [
        'id_vehiculo', 'id_persona', 'com_personal', 'com_empresa', 'id_pago',
        'cancelado_personal', 'hora_salida', 'hora_entrada', 'id_operacion','fecha_lavado','cliente_id'
    ];

    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class, 'id_vehiculo');
    }

    public function personal()
    {
        return $this->belongsTo(Personal::class, 'id_persona');
    }

    public function pago()
    {
        return $this->belongsTo(Pago::class, 'id_pago');
    }

    public function operacion()
    {
        return $this->belongsTo(Operacion::class, 'id_operacion');
    }

    public function productosServicio()
    {
        return $this->hasMany(ProductoServicio::class, 'id_lavado');
    }
    public static function updatePago($id,$idPago){
          $lavado = self::find($id);
          // Verificar si el registro del lavado existe
          if (!$lavado) {
              return false; // O lanzar una excepción si prefieres
          }
          $fechaActual = Carbon::now();
          // Actualizar el campo id_pago
          $lavado->id_pago = $idPago;
          $lavado->id_operacion=2;
          $lavado->hora_salida=$fechaActual;
          // Guardar los cambios
          return $lavado->save();
    }
    public static function getLavadosNoPagados($idpersonal){
      // Validar que $idpersonal sea un entero válido.
      if (!is_numeric($idpersonal)) {
          throw new InvalidArgumentException("El ID del personal no es válido.");
      }

      // Realizar la consulta
      return DB::table('servicios_comision')
          ->where('idpersonal', '=', $idpersonal)
          ->where('id_operacion', '<>', 3)
          ->where('cancelado_personal', '=', false)  // Filtrar por servicios no cancelados
          ->get();
    }


}
