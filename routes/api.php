<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\PersonalController;
use App\Http\Controllers\VehiculoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\LavadoController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\GastosController;
use App\Http\Controllers\DeudaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */
Route::GET('getRecibo/{id}',[PagoController::class,'reciboPDF']);
Route::GET('getReporte/{desde}/{hasta}',[LavadoController::class, 'reportPDF']);
Route::POST('register',[AuthController::class,'register']);
Route::prefix('auth')->group(function(){
   
    Route::POST('login',[AuthController::class,'login']);
});
Route::middleware(['jwt'])->group(function () {
    Route::POST('savePersonal',[PersonalController::class,'store']);
    Route::GET('getPersonal',[PersonalController::class,'index']);
    Route::GET('getPersonalData/{data}',[PersonalController::class,'getPersonalBydata']);
    Route::GET('getPersonal/{id}',[PersonalController::class,'show']);
    Route::POST('editPersonal/{id}',[PersonalController::class,'update']);
    Route::get('vehiculos', [VehiculoController::class, 'index']);
    Route::get('vehiculos/{id}', [VehiculoController::class, 'show']);
    Route::post('saveVehiculo', [VehiculoController::class, 'store']);
    Route::put('vehiculos/{id}', [VehiculoController::class, 'update']);
    Route::get('getVehiculoData/{data}', [VehiculoController::class, 'getvehiculoPlaca']);
    Route::get('/getProducto', [ProductoController::class, 'index']);
    Route::get('/getProductoById/{id}', [ProductoController::class, 'show']);
    Route::POST('editProducto/{id}',[ProductoController::class,'update']);
    Route::post('saveProducto', [ProductoController::class, 'store']);
    Route::get('getProductoData/{data}', [ProductoController::class, 'getProductoNombre']);
    Route::get('/productos/{id}', [ProductoController::class, 'show']);
    Route::put('/productos/{id}', [ProductoController::class, 'update']);
    Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);
    Route::get('/getServicio', [ServicioController::class, 'index']);
    Route::post('/servicios', [ServicioController::class, 'store']);
    Route::get('/servicios/{id}', [ServicioController::class, 'show']);
    Route::get('/getServicioData/{data}', [ServicioController::class, 'getServiceByName']);
    Route::put('/servicios/{id}', [ServicioController::class, 'update']);
    Route::delete('/servicios/{id}', [ServicioController::class, 'destroy']);
    Route::post('/saveServicio', [LavadoController::class, 'store']);
    Route::get('/getlavadoPendiente', [LavadoController::class, 'listPendiente']);
    Route::get('/getDataServicioByid/{id}', [LavadoController::class, 'GetServicioPendienteById']);
    Route::post('/savePago', [PagoController::class, 'store']);
    Route::post('/editarServicio',[LavadoController::class,'registroEdicionServicio']);
    Route::post('/setProductoPersonal',[PersonalController::class,'setProductoPersonal']);
    Route::get('/getDataPagoPendientePersonal/{id}', [PersonalController::class, 'getInfoPaymentPending']);
    Route::post('/setpagoPersonal',[PersonalController::class,'setPagoSPPersonal']);
    Route::post('/saveGasto',[GastosController::class,'store']);
    Route::get('/getGastos',[GastosController::class,'index']);
    Route::post('/obtenerGastosPorFecha',[GastosController::class,'obtenerGastosPorFecha']);
    Route::get('getdataGasto/{id}',[GastosController::class,'show']);
    Route::post('saveEditGasto/{id}',[GastosController::class,'update']);
    Route::get('getDataReport/{desde?}/{hasta?}/{tipo?}',[LavadoController::class,'reportGenerador']);
    Route::post('saveDeuda', [DeudaController::class, 'store']);
    Route::post('saveCliente', [ClienteController::class, 'store']);
    Route::get('getVehiculoCliente/{tipo}/{id}', [ClienteController::class, 'show']);
    Route::post('actualizarVehiculosCliente', [ClienteController::class, 'actualizarVehiculos']);
    Route::get('obtenerClientes/{tipo}', [ClienteController::class, 'obtenerClientes']);
    Route::get('getClienteByNombreNIT/{data}',[ClienteController::class, 'getClientes']);
    


});
