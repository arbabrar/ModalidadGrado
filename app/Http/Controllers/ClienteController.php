<?php

namespace App\Http\Controllers;
use App\Models\cliente;
use App\Models\natural;
use App\Models\juridico;
use App\Models\cliente_vehiculo;
use App\Models\vehiculo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

class ClienteController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();

        // Validación común para todos los clientes
        $validator = Validator::make($data, [
            'tipo_cliente' => 'required|in:natural,juridico',
            'direccion' => 'required|string|max:100',
            'telefono' => 'required|string|max:15',
            'nit' => 'nullable|string|max:20'
        ]);

        if ($validator->fails()) {
            return response()->json(["error" => $validator->errors()], 422);
        }

        $cliente = cliente::create([
            'direccion' => $data['direccion'],
            'telefono' => $data['telefono'],
            'nit' => $data['nit'] ?? null,
        ]);

        if ($data['tipo_cliente'] === 'natural') {
            $naturalValidator = Validator::make($data, [
                'nombre' => 'required|string|max:50',
                'apellido_paterno' => 'required|string|max:50',
                'apellido_materno' => 'required|string|max:50',
                'fecha_nacimiento' => 'required|date',
                'genero' => 'nullable|string|max:10'
            ]);

            if ($naturalValidator->fails()) {
                return response()->json(["error" => $naturalValidator->errors()], 422);
            }
 
            natural::create([
                'cliente_id' => $cliente->id,
                'nombre' => $data['nombre'],
                'apellido_paterno' => $data['apellido_paterno'],
                'apellido_materno' => $data['apellido_materno'],
                'fecha_nacimiento' => $data['fecha_nacimiento'],
                'genero' => $data['genero'] ?? null,
            ]);

        } elseif ($data['tipo_cliente'] === 'juridico') {
            $juridicoValidator = Validator::make($data, [
                'razon_social' => 'required|string|max:100',
                'no_patron' => 'nullable|string|max:50',
                'representante_legal' => 'required|string|max:100'
            ]);

            if ($juridicoValidator->fails()) {
                return response()->json(["error" => $juridicoValidator->errors()], 422);
            }

            juridico::create([
                'cliente_id' => $cliente->id,
                'razon_social' => $data['razon_social'],
                'no_patron' => $data['no_patron'] ?? null,
                'representante_legal' => $data['representante_legal'],
            ]);
        }

        return response()->json([
            "message" => "Cliente registrado correctamente",
            "clase" => $data['tipo_cliente'],
            "id" => encrypt($cliente->id),
            "cliente" => DB::table('cliente_juntos')->where('id',$cliente->id)->first()
        
        ], 201);
    }

   public function show($tipo, $id)
    {
        try {
            $id = Crypt::decrypt($id);
        } catch (\Exception $e) {
            return response()->json(["error" => "ID inválido"], 400);
        }

        $cliente = null;

        switch ($tipo) {
            case 'natural':
                $cliente = natural::with('cliente')->where('cliente_id', $id)->first();
                break;
            case 'juridico':
                $cliente = juridico::with('cliente')->where('cliente_id', $id)->first();
                break;
            default:
                return response()->json(["error" => "Tipo de cliente no válido"], 400);
        }

        if (!$cliente) {
            return response()->json(["error" => "Cliente no encontrado"], 404);
        }

        $vehiculos = DB::table('vehiculo_cliente_estado')->where('cliente_id',$id)->get();
        $cliente->vehiculos = $vehiculos;

        return response()->json($cliente);
    }
    public function obtenerClientes($tipo)
    {
        $tabla = $tipo === 'juridico' ? 'cliente_juridico' : 'cliente_natural';

        $clientes = DB::table($tabla)->get();

        $clientesEncriptados = $clientes->map(function ($cliente) {
            return [
                'id' => encrypt($cliente->id),
                'direccion' => $cliente->direccion ?? null,
                'telefono' => $cliente->telefono ?? null,
                'nit' => $cliente->nit ?? null,
                'nombre' => $cliente->nombre ?? null,
                
            ];
        });

        return response()->json($clientesEncriptados);
    }

    public function actualizarVehiculos(Request $request)
    {
         $data = $request->validate([
            'nuevos' => 'array',
            'nuevos.*.id' => 'required|integer|exists:vehiculos,id',
            'desasociar' => 'array',
            'desasociar.*.id' => 'required|integer|exists:vehiculos,id',
            'reasociar' => 'array',
            'reasociar.*.id' => 'required|integer|exists:vehiculos,id',
            'idcliente' => 'required|string'
        ]);

        try {
            $idCliente = Crypt::decrypt($data['idcliente']);
        } catch (\Exception $e) {
            return response()->json(["error" => "ID de cliente inválido"], 400);
        }

        if (!empty($data['nuevos'])) {
            foreach ($data['nuevos'] as $vehiculo) {
                cliente_vehiculo::create(
                    [
                        'cliente_id' => $idCliente,
                        'id_vehiculo' => $vehiculo['id'],
                        'estado' => 1
                    ]
                );
            }
        }

        // Desasociar vehículos
        if (!empty($data['desasociar'])) {
            foreach ($data['desasociar'] as $vehiculo) {
                cliente_vehiculo::where('cliente_id', $idCliente)
                    ->where('id_vehiculo', $vehiculo['id'])
                    ->update(['estado' => 2]);
            }
        }

        // Reasociar vehículos
        if (!empty($data['reasociar'])) {
            foreach ($data['reasociar'] as $vehiculo) {
                cliente_vehiculo::where('cliente_id', $idCliente)
                    ->where('id_vehiculo', $vehiculo['id'])
                    ->update(['estado' => 1]);
            }
        }
        return response()->json(["message" => "Cliente y vehículos actualizados correctamente"], 200);
    }
    public function getClientes($data){
       return DB::table('cliente_juntos')
        ->where(function ($query) use ($data) {
            $query->where('nombre', 'like', '%' . $data . '%')
                  ->orWhere('nit', 'like', '%' . $data . '%');
        })
        ->get();
    }
}
