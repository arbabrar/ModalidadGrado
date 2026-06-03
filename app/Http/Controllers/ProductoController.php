<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ProductoRequest;
use App\Models\productos;
class ProductoController extends Controller
{
    /**
     * Listar todos los productos.
     */
    public function index()
    {
        $productos = productos::all();
        return response()->json($productos);
    }

    /**
     * Guardar un nuevo producto.
     */
    public function store(ProductoRequest $request)
    {
        $producto = productos::create($request->validated());

        return response()->json([
            'message' => 'Producto creado exitosamente',
            'producto' => $producto
        ], 201);
    }

    /**
     * Mostrar un producto por ID.
     */
    public function show($id)
    {
        $producto = productos::find($id);

        if (!$producto) {
            return response()->json([
                'message' => 'Producto no encontrado'
            ], 404);
        }

        return response()->json($producto);
    }

    /**
     * Actualizar un producto existente.
     */
    public function update(Request $request, $id)
    {
        $producto = productos::find($id);

        if (!$producto) {
            return response()->json([
                'message' => 'Producto no encontrado'
            ], 404);
        }
        $validatedData = $request->validate([
          'nombreproducto' => 'required|string|max:255',
          'costo' => 'required|numeric|between:0,999999.99',
        ]);

        $producto->update($validatedData);

        return response()->json([
            'message' => 'Producto actualizado exitosamente',
            'producto' => $producto
        ]);
    }

    public function getProductoNombre($data){
      $producto = productos::where('nombreproducto', 'LIKE', "%{$data}%")->get();
      // Retorna el resultado de la búsqueda
      return response()->json($producto);
    }

    /**
     * Eliminar un producto por ID.
     */
    public function destroy($id)
    {
        $producto = productos::find($id);

        if (!$producto) {
            return response()->json([
                'message' => 'Producto no encontrado'
            ], 404);
        }

        $producto->delete();

        return response()->json([
            'message' => 'Producto eliminado exitosamente'
        ]);
    }
}
