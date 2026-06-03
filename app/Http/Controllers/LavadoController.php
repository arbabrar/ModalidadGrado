<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\lavado;
use App\Models\personal;
use App\Models\vehiculo;
use App\Models\productos_servicio;
use App\Models\productos;
use App\Models\lavado_servicio;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use PDF;
class LavadoController extends Controller
{
  /**
   * Guarda un nuevo lavado.
   */
  public function store(Request $request)
  {
    $validatedData = $request->validate([
      'id_vehiculo' => 'required|exists:vehiculos,id',
      'id_persona' => 'required|exists:personal,id',
      'id_cliente' => 'required|exists:cliente,id',
      'servicios' => 'required|array|min:1', // Aseguramos que servicios es un array con al menos 1 servicio
      'servicios.*.id' => 'required|exists:servicios,id', // Asegura que cada servicio tiene un id existente
      'servicios.*.costo' => 'required|numeric|min:10', // Valida que el costo sea un número y no negativo
    ]);
      $fechaActual = Carbon::now();
      // Crea el lavado utilizando la relación con el vehículo y persona
      $lavado = new lavado();
      $lavado->id_vehiculo = $validatedData['id_vehiculo'];
      $lavado->id_persona = $validatedData['id_persona'];
      $lavado->cliente_id = $validatedData['id_cliente'];
      $lavado->com_personal = '0.45';
      $lavado->com_empresa = '0.55';
      $lavado->cancelado_personal = false;
      $lavado->fecha_lavado =$fechaActual;
      $lavado->hora_entrada = $fechaActual;
      $lavado->id_operacion = 1;
      // Guardamos el lavado
      $lavado->save();

      // Asocia los servicios al lavado
    foreach ($validatedData['servicios'] as $servicio) {
        // Usamos el modelo LavadoServicio para almacenar los servicios del lavado
        $lavSer = new lavado_servicio();
        $lavSer->id_servicio = $servicio['id'];
        $lavSer->costo = $servicio['costo'];
        $lavSer->id_lavado = $lavado->id;
        $lavSer->id_operacion= 1;
        $lavSer->save();
    }

      return response()->json([
          'message' => 'Lavado registrado exitosamente.',
          'lavado' => $lavado
      ], 201);
  }
  public function GetServicioPendienteById($id){
    $lavado = lavado::find($id);
    //dd($lavado);
    if($lavado->id_operacion != 1){
      return response()->json([
        'status' => 205,
        'mensaje'=>'El Servicio ya ha sido pagado'
      ]);
    }
    $vehiculo = vehiculo::find($lavado->id_vehiculo);
    $personal = personal::find($lavado->id_persona);
    $cliente = DB::table('cliente_juntos')->where('id',$lavado->cliente_id)->first();
    $servicios = lavado_servicio::getTipoServiciosId($id,1);
    $productos = productos_servicio::getProductoServicioId($id,1);
    return response()->json([
        'status' => 200,
        'datos'=>[
          'vehiculo'=>$vehiculo,
          'personal'=>$personal,
          'servicios'=>$servicios,
          'productos' =>$productos,
          'cliente' => $cliente
        ]

    ]);
  }
  public function listPendiente(){

    $pendiente = DB::table('vista_lavado')->where('id_operacion','=',1)->get();
    return response()->json($pendiente);

  }

  public function registroEdicionServicio(Request $request){
    $validatedData = $request->validate([
       'id_servicio' => 'required|exists:lavados,id',
       'serviciosNuevos' => 'array', // Se espera al menos un
       'serviciosNuevos.*.costo' => 'required|numeric|min:0.01',
       'serviciosNuevos.*.id' => 'required|exists:servicios,id',
       'productosNuevos' => 'array', // Se puede no enviar productos
       'productosNuevos.*.costo' => 'required|numeric|min:0.01',
       'productosNuevos.*.id' => 'required|exists:productos,id',
       'cancelServicio' => 'array',
       'cancelServicio.*.id' => 'required|exists:lavado_servicio,id',
       'cancelProducto' => 'array',
       'cancelProducto.*.id' => 'required|exists:producto_servicio,id',
   ]);
   // Obtener el lavado por el ID
    $lavado = Lavado::findOrFail($validatedData['id_servicio']);
    $fechaActual = Carbon::now();
    // Registrar los nuevos servicios
    if (!empty($validatedData['serviciosNuevos'])) {
        foreach ($validatedData['serviciosNuevos'] as $servicio) {
            DB::table('lavado_servicio')->insert([
                'id_lavado' => $lavado->id,
                'id_servicio' => $servicio['id'],
                'costo' => $servicio['costo'],
                'id_operacion' => 1, // Se asume que es la operación de agregar servicio
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    // Registrar los nuevos productos
    if (!empty($validatedData['productosNuevos'])) {
        foreach ($validatedData['productosNuevos'] as $producto) {
            DB::table('producto_servicio')->insert([
                'id_lavado' => $lavado->id,
                'id_producto' => $producto['id'],
                'costo' => $producto['costo'],
                'fecha' => $fechaActual,
                'id_operacion' => 1, // Se asume que es la operación de agregar producto
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    // Cancelar servicios existentes
    if (!empty($validatedData['cancelServicio'])) {
        foreach ($validatedData['cancelServicio'] as $servicioCancelado) {
            $lavadoServicio=lavado_servicio::find($servicioCancelado['id']);
            $lavadoServicio->id_operacion = 3;
            $lavadoServicio->save();
        }
    }
    // Cancelar productos existentes
    if (!empty($validatedData['cancelProducto'])) {
        foreach ($validatedData['cancelProducto'] as $productoCancelado) {
            $productoServicio= productos_servicio::find($productoCancelado['id']);
            $productoServicio->id_operacion = 3;
            $productoServicio->save();
        }
    }

    // Retornar respuesta de éxito
    return response()->json([
        'message' => 'Servicios y productos registrados correctamente',
    ], 201);


  }
  public function reportPDF($desde=null, $hasta= null){
      $desde = $desde ?? now();
      $hasta = $hasta ?? now();
      $lavados = DB::table('resumen_lavados')
          ->select('personal',
                   DB::raw('COUNT(placa) as cantidad'),
                   DB::raw('SUM(costo) as total_costo'),
                   DB::raw('SUM(comision) as total_comision'),
                   DB::raw('SUM(ingreso) as total_ingreso')

          )
          ->whereBetween('fecha_lavado', [$desde, $hasta])  // Filtrar por rango de fechas
          ->groupBy('personal')
          ->get();
     $metodo_pago_lavado = DB::table('resumen_lavados')
          ->select('metodo_pago',DB::raw('COUNT(placa) as cantidad'),
                   DB::raw('SUM(costo) as total_costo')
          )
          ->whereBetween('fecha_lavado', [$desde, $hasta])  // Filtrar por rango de fechas
          ->groupBy('metodo_pago')
          ->get();
       $productos_servicio = DB::table('resumen_producto_servicio')
           ->select('nombreproducto',
                    DB::raw('COUNT(nombreproducto) as cantidad'),
                    DB::raw('SUM(costo) as total_costo'),

           )
           ->whereBetween('fecha', [$desde, $hasta])  // Filtrar por rango de fechas
           ->groupBy('nombreproducto')
           ->get();
       $metodoPagoprod_ser = DB::table('resumen_producto_servicio')
               ->select('metodo_pago',
                        DB::raw('SUM(costo) as total_costo')
               )
               ->whereBetween('fecha', [$desde, $hasta])  // Filtrar por rango de fechas
               ->groupBy('metodo_pago')
               ->get();
       $productos_personal= DB::table('resumenproductopersonal')
           ->select('nombreproducto',
                    DB::raw('COUNT(nombreproducto) as cantidad'),
                    DB::raw('SUM(costo) as total_costo'),
                    'estado'
           )
           ->whereBetween('fecha', [$desde, $hasta])  // Filtrar por rango de fechas
           ->groupBy('nombreproducto','estado')
           ->get();
           $deuda =DB::table('v_pago_deuda')
                     ->select('personal',
                              DB::raw('SUM(monto_pagado) as total')
                     )
                     ->whereBetween('fecha_pago', [$desde, $hasta])  // Filtrar por rango de fechas
                     ->groupBy('personal')
                     ->get();
         $gasto =DB::table('v_gastos')
             ->select('personal','metodo_pago',
                      DB::raw('SUM(monto) as total')
             )
             ->whereBetween('fecha', [$desde, $hasta])  // Filtrar por rango de fechas
             ->groupBy('personal','metodo_pago')
             ->get();
             $data = [
                     'desde' =>$desde,
                     'hasta' =>$hasta,
                     'lavados' =>$lavados,
                     'deuda' =>$deuda,
                     'metodoPagoLavado' => $metodo_pago_lavado,
                     'metodoPadoServicio' => $metodoPagoprod_ser,
                     'productoPersonal'=>$productos_personal,
                     'productoServicio'=>$productos_servicio,
                     'gastos'=>$gasto
                 ];
            //dd($data);

                 // Cargar la vista con los datos
                 $pdf = PDF::loadView('reporte_servicio', $data);
                 $nombre_archivo = 'reporte'."_".now();
                 // Descargar el PDF con un nombre específico
                 return $pdf->stream($nombre_archivo);
  }

  public function reportGenerador($desde=null, $hasta= null , $tipo= 1){
        // Si $desde o $hasta no se especifican, puedes asignar valores por defecto.
       $desde = $desde ?? now();
       $hasta = $hasta ?? now();


       if($tipo === 1){
         $lavados = DB::table('resumen_lavados')
             ->select('personal',
                      DB::raw('COUNT(placa) as cantidad'),
                      DB::raw('SUM(costo) as total_costo'),
                      DB::raw('SUM(comision) as total_comision'),
                      DB::raw('SUM(ingreso) as total_ingreso')

             )
             ->whereBetween('fecha_lavado', [$desde, $hasta])  // Filtrar por rango de fechas
             ->groupBy('personal')
             ->get();
        $metodo_pago_lavado = DB::table('resumen_lavados')
             ->select('metodo_pago',DB::raw('COUNT(placa) as cantidad'),
                      DB::raw('SUM(costo) as total_costo')
             )
             ->whereBetween('fecha_lavado', [$desde, $hasta])  // Filtrar por rango de fechas
             ->groupBy('metodo_pago')
             ->get();
          $productos_servicio = DB::table('resumen_producto_servicio')
              ->select('nombreproducto',
                       DB::raw('COUNT(nombreproducto) as cantidad'),
                       DB::raw('SUM(costo) as total_costo'),

              )
              ->whereBetween('fecha', [$desde, $hasta])  // Filtrar por rango de fechas
              ->groupBy('nombreproducto')
              ->get();
          $metodoPagoprod_ser = DB::table('resumen_producto_servicio')
                  ->select('metodo_pago',
                           DB::raw('SUM(costo) as total_costo')
                  )
                  ->whereBetween('fecha', [$desde, $hasta])  // Filtrar por rango de fechas
                  ->groupBy('metodo_pago')
                  ->get();
          $productos_personal= DB::table('resumenproductopersonal')
              ->select('nombreproducto',
                       DB::raw('COUNT(nombreproducto) as cantidad'),
                       DB::raw('SUM(costo) as total_costo'),
                       'estado'
              )
              ->whereBetween('fecha', [$desde, $hasta])  // Filtrar por rango de fechas
              ->groupBy('nombreproducto','estado')
              ->get();
            $gasto =DB::table('v_gastos')
                ->select('personal','metodo_pago',
                         DB::raw('SUM(monto) as total')
                )
                ->whereBetween('fecha', [$desde, $hasta])  // Filtrar por rango de fechas
                ->groupBy('personal','metodo_pago')
                ->get();
          $deuda =DB::table('v_pago_deuda')
                    ->select('personal',
                             DB::raw('SUM(monto_pagado) as total')
                    )
                    ->whereBetween('fecha_pago', [$desde, $hasta])  // Filtrar por rango de fechas
                    ->groupBy('personal')
                    ->get();

       }
       return response()->json([
          'lavado'=>$lavados,
          'productos_servicio'=>$productos_servicio,
          'producto_personal'=>$productos_personal,
          'gasto'=> $gasto,
          'metodo_pago_lavado'=> $metodo_pago_lavado,
          'metodo_pago_producto'=> $metodoPagoprod_ser,
          'deuda' => $deuda
       ],200);

  }
}
