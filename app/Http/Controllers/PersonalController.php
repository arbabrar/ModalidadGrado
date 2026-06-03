<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersonalRequest;
use Illuminate\Http\Request;
use App\Models\personal;
use App\Models\productos;
use App\Models\lavado;
use App\Models\deuda;
use App\Models\producto_personal;
use App\Models\lavado_servicio;
use App\Models\pago_deuda;
use Carbon\Carbon;

class PersonalController extends Controller
{
    /**
     * Listar todo el personal.
     */
    public function index()
    {
        $personal = personal::all();
        return response()->json($personal);
    }
    /**
     * Guardar un nuevo registro de personal.
     */
    public function store(PersonalRequest $request)
    {
        //dd('hola');
        $personal = personal::create($request->validated());
        return response()->json([
            'message' => 'Personal registrado exitosamente',
            'personal' => $personal
        ], 201);
    }
    /**
     * Mostrar un registro de personal por ID.
     */
    public function show($id)
    {
        $personal = personal::find($id);

        if (!$personal) {
            return response()->json([
                'message' => 'Personal no encontrado'
            ], 404);
        }

        return response()->json($personal);
    }
    /**
     * Editar un registro de personal.
     */
    public function update(Request $request, $id)
    {
        $personal = personal::find($id);

        if (!$personal) {
            return response()->json([
                'message' => 'Personal no encontrado'
            ], 404);
        }
        $validatedData = $request->validate([
          'nombre' => 'required|string|max:255',
          'apellido' => 'required|string|max:255',
          'celular' => 'required|string|max:15',
          'fecha_nacimiento' => 'required|date',
          'direccion' => 'required|string|max:255',
        ]);
        $personal->update($validatedData);

        return response()->json([
            'message' => 'Personal actualizado exitosamente',
            'personal' => $personal
        ]);
    }
    /**
     * Datos poor nombre y nro de documento
     */

    public function getPersonalBydata($data)
    {
        // Busca por apellido o número de documento usando LIKE
        $personal = personal::where('apellido', 'LIKE', "%{$data}%")
            ->orWhere('nombre', 'LIKE', "%{$data}%")
            ->orWhere('documento', 'LIKE', "%{$data}%")
            ->get();

        // Retorna el resultado de la búsqueda
        return response()->json($personal);
    }
    public function setProductoPersonal(Request $request){
      $validatedData = $request->validate([
          'id_personal' => 'required|exists:personal,id', // Validar que el ID del personal exista en la tabla personals
          'productos' => 'required|array|min:1', // Validar que productos sea un array con al menos un producto
          'productos.*.id' => 'required|exists:productos,id', // Validar que el ID del producto exista
          'productos.*.costo' => 'required|numeric|min:0.01', // Validar que el costo sea numérico y mayor a 0
      ]);
     $personal = personal::findOrFail($validatedData['id_personal']);
     foreach ($validatedData['productos'] as $productoData) {
          // Verificar si el producto existe
          $producto = productos::findOrFail($productoData['id']);

          producto_personal::create([
               'id_personal' => $validatedData['id_personal'],  // Usa el ID del personal validado
               'id_producto' => $productoData['id'],            // Usa el ID del producto validado
               'costo' => $productoData['costo'],
               'fecha'=>Carbon::now(),            // Usa el costo enviado
               'id_operacion' => 1,                             // Puedes ajustar el ID de la operación según corresponda
               'created_at' => now(),                           // Fecha de creación actual
               'updated_at' => now(),                           // Fecha de actualización actual
           ]);
      }

      return response()->json([
            'message' => 'Productos asociados al personal correctamente'
      ], 201);
    }
    public function getInfoPaymentPending($id){
      $personal = personal::find($id);

      if (!$personal) {
          return response()->json([
              'message' => 'Personal no encontrado'
          ], 404);
      }
      $personal = personal::find($id);
      $servicios = lavado::getLavadosNoPagados($id);
      $productos = personal::getProductoPendingPay($id);
      $deuda =deuda::getDatoDeuda($id);
      //dd($deuda);
      if($deuda){

          $totalPagable = $servicios->sum('comision');
          $cuotaPagable = ceil($totalPagable * 0.2);
          if($cuotaPagable > $deuda->monto_restante){
            $cuotaPagable=$deuda->monto_restante;
          }
          $minimoPagable=ceil($cuotaPagable * 0.1);
          $deuda = [
              'id' => $deuda->id,
              'descripcion'=>$deuda->descripcion,
              'monto_deuda'=>$deuda->monto_total,
              'monto_restante'=>$deuda->monto_total,
              'pago_minimo' => $minimoPagable,
              'cuota'=>$cuotaPagable
          ];

      }
      return response()->json([
          'status' => 200,
          'datos'=>[
            'personal'=>$personal,
            'servicios'=>$servicios,
            'productos' =>$productos,
            'deuda' =>$deuda
          ]

      ]);
    }
    public function setPagoSPPersonal(Request $request){
      $validatedData = $request->validate([
          'id_personal' => 'required|exists:personal,id',
          'monto_pagar' => [
            'required',
            'numeric',
            // Validar que monto_pagar sea mayor a 1 si id_deuda es diferente a 1
              function ($attribute, $value, $fail) use ($request) {
                  if ($request->id_deuda != 0 && $value < 1) {
                      $fail('El monto a pagar debe ser mayor a 1.');
                  }
              },
          ],
          // Validación de servicios si el array tiene al menos un elemento
          'servicios' => 'sometimes|array', // Solo si hay más de un servicio
          'servicios.*.id' => 'required_with:servicios|exists:lavado_servicio,id',

          // Validación de productos si el array tiene al menos un elemento
          'productos' => 'sometimes|array', // Solo si hay más de un producto
          'productos.*.id' => 'required_with:productos|exists:producto_personal,id',
      ]);

       foreach ($validatedData['servicios'] as $servicioData) {
                $servicio = lavado_servicio::find($servicioData['id']);

                // Verificar que el servicio aún no esté cancelado
                if (!$servicio->cancelado_personal) {
                    $servicio->cancelado_personal = true;
                    $servicio->fecha_pago_personal = now();
                    $servicio->save();
                }
      }
      foreach ($validatedData['productos'] as $productoData) {
                $producto = producto_personal::find($productoData['id']);

                // Verificar que el producto aún no esté cancelado
                if (!$producto->cancelado) {
                    $producto->cancelado = true;
                    $producto->fecha_pago = now(); // Registrar la fecha actual como fecha de pago
                    $producto->save();
                }
      }

      if($request->id_deuda != 0) {
          $deuda = deuda::find($request->id_deuda);
          if($deuda->estado=='pendiente'){
              $saldo = $deuda->monto_restante - $request->monto_pagar;
                $deuda->monto_restante= $saldo;
              if($saldo <= 0){
                  $deuda->estado=='cancelado';
              }
              $deuda->save();
              $pagodeuda = new pago_deuda;
              $pagodeuda->id_personal = $validatedData['id_personal'];
              $pagodeuda->id_deuda = $request->id_deuda;
              $pagodeuda->fecha_pago = now();
              $pagodeuda->monto_pagado = $request->monto_pagar;
              $pagodeuda->metodo_pago = 'efectivo';
              $pagodeuda->estado = 'contabilizado';
              // Guardamos el lavado
              $pagodeuda->save();
          }

      }

      return response()->json([
                'message' => 'Pago de servicios y productos registrado exitosamente',
            ], 200);

    }
}
