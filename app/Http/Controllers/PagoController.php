<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PagoRequest;
use App\Models\pago;
use App\Models\lavado;
use App\Models\vehiculo;
use App\Models\personal;
use App\Models\lavado_servicio;
use App\Models\productos_servicio;
use PDF;
class PagoController extends Controller
{
  public function store(PagoRequest $request)
  {
      // Validación y creación de un nuevo pago
      $validatedData = $request->validated();
      $pago = pago::create($validatedData);

      $idlavado = $request->id_servicio;
      lavado::updatePago($idlavado, $pago->id);
      lavado_servicio::setPagado($idlavado);
      productos_servicio::setPagado($idlavado,$pago->id);

      return response()->json([
          'message' => 'Pago registrado exitosamente',
          'id' => encrypt($idlavado)
      ], 201);
  }

  public function reciboPDF($id){
    $id = decrypt($id);
    $lavado = lavado::find($id);
    //dd($lavado);
    if($lavado->id_operacion != 2){
      return response()->json([
        'status' => 205,
        'mensaje'=>'Este servicio aun no ha sido pagado'
      ]);
    }

    $vehiculo = vehiculo::find($lavado->id_vehiculo);
    $personal = personal::find($lavado->id_persona);
    $pago = pago::find($lavado->id_pago);
    $servicios = lavado_servicio::getTipoServiciosId($id,2);
    $productos = productos_servicio::getProductoServicioId($id,2);
    $data = [
            'fecha' =>$lavado->fecha_lavado,
            'pago' =>$pago,
            'vehiculo' => $vehiculo,
            'tecnico' => $personal,
            'servicios'=>$servicios,
            'productos'=>$productos
        ];
  //  dd($data);

        // Cargar la vista con los datos
        $pdf = PDF::loadView('recibo', $data);
        $nombre_archivo = $vehiculo->placa."_".$lavado->fecha_lavado;
        // Descargar el PDF con un nombre específico
        return $pdf->stream($nombre_archivo);
  }
}
