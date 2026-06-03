<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| Todas las rutas que no sean /api/* se delegan al SPA de React.
| Esto permite que React Router maneje la navegación en el cliente
| sin que Laravel devuelva 404 al refrescar la página.
*/

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '^(?!api).*$');
