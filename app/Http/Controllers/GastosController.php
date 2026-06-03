<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\DB;

use App\Models\gasto;

class GastosController extends Controller
{
  // Muestra todos los gastos
 public function index()
 {
     $gastos = DB::table('v_gastos')->get();
     return response()->json($gastos, 200);
 }
 public function obtenerGastosPorFecha(Request $request)
     {
         // Validar las fechas proporcionadas en la solicitud
         $request->validate([
             'dateFrom' => 'required|date',
             'dateTo' => 'required|date|after_or_equal:dateFrom',
         ]);

         // Obtener los gastos en el rango de fechas
         $gastos = DB::table('v_gastos')->whereBetween('fecha', [$request->dateFrom, $request->dateTo])
             ->get();

         // Retornar los gastos como respuesta JSON
         return response()->json($gastos);
     }
 // Muestra un gasto por su ID
 public function show($id)
 {
     $gasto = gasto::find($id);
     if (!$gasto) {
         return response()->json(['message' => 'Gasto no encontrado'], 404);
     }
     return response()->json($gasto, 200);
 }

 // Crea un nuevo gasto
 public function store(Request $request)
 {
     // Validación de datos de entrada
     $validator = Validator::make($request->all(), [
       'id_personal' => 'required|exists:personal,id',
       'detalle' => 'required|string|max:150',
       'fecha' => 'required|date',
       'monto' => 'required|numeric|min:0.01',
       'nro_factura' => 'nullable|string|max:50',
       'proveedor' => 'required|string|max:100',
       'metodo_pago' => 'required|in:qr,efectivo,credito', // Validación del método de pago
   ]);

     if ($validator->fails()) {
         return response()->json(['errors' => $validator->errors()], 422);
     }

     // Crear el gasto
     $gasto = gasto::create($request->all());

     return response()->json(['message' => 'Gasto registrado exitosamente', 'gasto' => $gasto], 201);
 }

 // Actualiza un gasto existente
 public function update(Request $request, $id)
 {
     $gasto = gasto::find($id);
     if (!$gasto) {
         return response()->json(['message' => 'Gasto no encontrado'], 404);
     }

     // Validación de datos de entrada
     $validator = Validator::make($request->all(), [
         'id_personal' => 'required|exists:personal,id',
         'detalle' => 'required|string|max:150',
         'fecha' => 'required|date',
         'monto' => 'required|numeric|min:0.01',
         'nro_factura' => 'nullable|string|max:50',
         'proveedor' => 'required|string|max:100',
         'metodo_pago' => 'required|in:qr,efectivo,credito', // Validación del método de pago
     ]);

     if ($validator->fails()) {
         return response()->json(['errors' => $validator->errors()], 422);
     }

     // Actualizar el gasto
     $gasto->update($request->all());

     return response()->json(['message' => 'Gasto actualizado exitosamente', 'gasto' => $gasto], 200);
 }

 // Elimina un gasto
 public function destroy($id)
 {
     $gasto = gasto::find($id);
     if (!$gasto) {
         return response()->json(['message' => 'Gasto no encontrado'], 404);
     }

     $gasto->delete();
     return response()->json(['message' => 'Gasto eliminado exitosamente'], 200);
 }
}
