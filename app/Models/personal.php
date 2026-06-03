<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
class personal extends Model
{
    use HasFactory;
    protected $table = 'personal';

    protected $fillable = [
        'nombre', 'apellido', 'documento', 'celular', 'direccion',
        'fotografia', 'fecha_nacimiento'
    ];

    public function lavados()
    {
        return $this->hasMany(Lavado::class, 'id_persona');
    }

    public function gastos()
    {
        return $this->hasMany(Gasto::class, 'id_personal');
    }
    public static function getProductoPendingPay($idpersonal){
      if (!is_numeric($idpersonal)) {
          throw new InvalidArgumentException("El ID del personal no es válido.");
      }

      // Realizar la consulta
      return DB::table('producto_personal')
            ->join('personal', 'personal.id', '=', 'producto_personal.id_personal')
            ->join('productos', 'productos.id', '=', 'producto_personal.id_producto')
            ->select(
                'producto_personal.id',
                DB::raw("CONCAT(personal.nombre, ' ', personal.apellido) AS personal"),
                'producto_personal.fecha',
                'producto_personal.costo',
                'nombreproducto'
            )
            ->where('id_personal', '=', $idpersonal)
            ->where('id_operacion', '=', 1)
            ->where('cancelado', '=', false)  // Filtrar por servicios no cancelados
            ->get();


    }
}
