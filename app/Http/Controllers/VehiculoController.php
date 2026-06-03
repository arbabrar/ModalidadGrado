<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\VehiculoRequest;
use App\Models\vehiculo;

class VehiculoController extends Controller
{
    // Mostrar una lista de vehículos
    public function index()
    {
        $vehiculos = vehiculo::all(); // Recupera todos los vehículos
        return response()->json($vehiculos); // Retorna en formato JSON
    }

    // Mostrar un vehículo específico
    public function show($id)
    {
        $vehiculo = vehiculo::find($id); // Busca el vehículo por su ID
        if ($vehiculo) {
            return response()->json($vehiculo);
        } else {
            return response()->json(['error' => 'Vehículo no encontrado'], 404);
        }
    }

    // Crear un nuevo vehículo
    public function store(VehiculoRequest $request) // Usar VehiculoRequest para la validación
    {
        $vehiculo = vehiculo::create($request->validated()); // Crea un nuevo registro con los datos validados
        return response()->json([
            'message' => 'Vehiculo registrado exitosamente',
            'vehiculo' => $vehiculo
        ], 201);
    }

    // Actualizar un vehículo existente
    public function update(VehiculoRequest $request, $id)
    {
        $vehiculo = vehiculo::find($id); // Busca el vehículo por su ID
        if (!$vehiculo) {
            return response()->json(['error' => 'Vehículo no encontrado'], 404);
        }

        $vehiculo->update($request->validated()); // Actualiza los datos con los validados
        return response()->json($vehiculo); // Retorna el vehículo actualizado
    }

    // Eliminar un vehículo
    public function destroy($id)
    {
        $vehiculo = vehiculo::find($id);
        if (!$vehiculo) {
            return response()->json(['error' => 'Vehículo no encontrado'], 404);
        }

        $vehiculo->delete(); // Elimina el registro
        return response()->json(['message' => 'Vehículo eliminado exitosamente']);
    }

    public function getvehiculoPlaca($dato){

      $vehiculo = vehiculo::where('placa', 'LIKE', "%{$dato}%")->get();
      // Retorna el resultado de la búsqueda
      return response()->json($vehiculo);
    }
}
