<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\deuda;
use App\Models\personal;

use Illuminate\Support\Facades\Validator;

class DeudaController extends Controller
{
  /**
   * Muestra una lista de todas las deudas.
   */
  public function index()
  {
      // Recuperar todas las deudas
      $deudas = deuda::with('personal')->get();
      return response()->json($deudas, 200);
  }

  /**
   * Almacenar una nueva deuda.
   */
  public function store(Request $request)
  {
      // Validación de la solicitud
      $validator = Validator::make($request->all(), [
          'id_personal' => 'required|exists:personal,id',
          'descripcion' => 'required|string|max:255',
          'fecha_generacion' => 'required|date',
          'monto_total' => 'required|numeric|min:0.01',
          'estado' => 'required|in:pendiente,pagada,cancelada',
          'fecha_vencimiento' => 'nullable|date',
      ]);

      // Si la validación falla, devolver errores
      if ($validator->fails()) {
          return response()->json(['errors' => $validator->errors()], 422);
      }

      // Crear una nueva deuda con los datos validados
      $deuda = deuda::create([
             'id_personal' => $request->id_personal,
             'descripcion' => $request->descripcion,
             'fecha_generacion' => $request->fecha_generacion,
             'monto_total' => $request->monto_total,
             'monto_restante' => $request->monto_total, // Asignar el mismo valor de monto_total
             'estado' => $request->estado,
             'fecha_vencimiento' => $request->fecha_vencimiento,
         ]);

         return response()->json(['message' => 'Deuda registrada exitosamente', 'deuda' => $deuda], 201);
  }

  /**
   * Muestra una deuda específica.
   */
  public function show($id)
  {
      // Buscar la deuda por ID
      $deuda = deuda::with('personal')->find($id);

      if (!$deuda) {
          return response()->json(['message' => 'Deuda no encontrada'], 404);
      }

      return response()->json($deuda, 200);
  }

  /**
   * Actualizar una deuda existente.
   */
  public function update(Request $request, $id)
  {
      // Validación de la solicitud
      $validator = Validator::make($request->all(), [
          'id_personal' => 'required|exists:personal,id',
          'descripcion' => 'required|string|max:255',
          'fecha_generacion' => 'required|date',
          'monto_total' => 'required|numeric|min:0.01',
          'monto_restante' => 'required|numeric|min:0.01',
          'estado' => 'required|in:pendiente,pagada,cancelada',
          'fecha_vencimiento' => 'nullable|date',
      ]);

      // Si la validación falla, devolver errores
      if ($validator->fails()) {
          return response()->json(['errors' => $validator->errors()], 422);
      }

      // Buscar la deuda por ID
      $deuda = deuda::find($id);

      if (!$deuda) {
          return response()->json(['message' => 'Deuda no encontrada'], 404);
      }

      // Actualizar los datos de la deuda
      $deuda->update($request->all());

      return response()->json(['message' => 'Deuda actualizada exitosamente', 'deuda' => $deuda], 200);
  }

  /**
   * Eliminar una deuda específica.
   */
  public function destroy($id)
  {
      // Buscar la deuda por ID
      $deuda = deuda::find($id);

      if (!$deuda) {
          return response()->json(['message' => 'Deuda no encontrada'], 404);
      }

      // Eliminar la deuda
      $deuda->delete();

      return response()->json(['message' => 'Deuda eliminada exitosamente'], 200);
  }
}
