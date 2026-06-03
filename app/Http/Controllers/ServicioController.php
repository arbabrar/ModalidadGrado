<?php

namespace App\Http\Controllers;


use App\Models\servicios;
use Illuminate\Http\Request;
use App\Http\Requests\ServicioRequest;

class ServicioController extends Controller
{
  /**
  * Listar todos los servicios.
  */
 public function index()
 {
     $servicios = servicios::all();
     return response()->json($servicios);
 }

 /**
  * Guardar un nuevo servicio.
  */
 public function store(ServicioRequest $request)
 {
     $servicio = servicios::create($request->validated());

     return response()->json([
         'message' => 'Servicio creado exitosamente',
         'servicio' => $servicio
     ], 201);
 }

 /**
  * Mostrar un servicio por ID.
  */
 public function show($id)
 {
     $servicio = servicios::find($id);

     if (!$servicio) {
         return response()->json([
             'message' => 'Servicio no encontrado'
         ], 404);
     }

     return response()->json($servicio);
 }

 /**
  * Actualizar un servicio existente.
  */
 public function update(ServicioRequest $request, $id)
 {
     $servicio = servicios::find($id);

     if (!$servicio) {
         return response()->json([
             'message' => 'Servicio no encontrado'
         ], 404);
     }

     $servicio->update($request->validated());

     return response()->json([
         'message' => 'Servicio actualizado exitosamente',
         'servicio' => $servicio
     ]);
 }
 public function getServiceByName($dato){
   $servicio = servicios::where('tipo', 'LIKE', "%{$dato}%")->get();
   // Retorna el resultado de la búsqueda
   return response()->json($servicio);
 }

 /**
  * Eliminar un servicio por ID.
  */
 public function destroy($id)
 {
     $servicio = servicios::find($id);

     if (!$servicio) {
         return response()->json([
             'message' => 'Servicio no encontrado'
         ], 404);
     }

     $servicio->delete();

     return response()->json([
         'message' => 'Servicio eliminado exitosamente'
     ]);
 }
}
