<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recibo de Pago</title>
  <style>
        body {
            font-family: Arial, sans-serif;
        }

        .header {
            position: relative;
            height: 40px; /* Puedes ajustar la altura */
        }

        .header img.logo {
           float: left;
           width: 150px; /* Ajusta el tamaño de la imagen */
           height: auto;
       }

       .header p {
         position: absolute;
         top: 0;
         right: 0;
         margin: 0;
         padding: 0;
         font-size: 10px; /* Tamaño de fuente ajustable */
         text-align: right;
         line-height: 1;
       }

        .content {
            margin-top: 20px;
        }

        .content h2 {
            text-align: center;
            margin-bottom: 30px;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            font-size: 10px;
            border: 1px solid black; /* Borde para toda la tabla */
        }

        .table th, .table td {
            border: 1px solid black; /* Borde para las celdas */
            padding: 10px;
        }

        .table th {

            text-align: center;
        }

        .table td {
            text-align: right;
        }

        .table td:first-child {
            text-align: left;
        }

        .footer {
            text-align: center;
            margin-top: 30px;
        }

        .td-titulo {
          text-align: center;
          background-color: #4b4b49;
          color: white;
          font-weight: bold;
        }

        .bg-dark {
          background-color: #4b4b49;
          color: white;
        }
        .tecnico{
          font-size: 8px;
        }

    </style>
</head>
<body>
  <!-- Encabezado con logotipo y fecha -->
  <div class="header">
    <img src="{{ public_path('img/logolavadero.png') }}" alt="Logotipo" class="logo">
    <p>{{ \Carbon\Carbon::now()->format('d/m/Y H:i:s') }}</p>
  </div>

  <!-- Contenido del recibo -->
  <div class="content">
    <h2>RECIBO DE PAGO</h2>

    <!-- Datos del vehículo -->
    <table class="table">
      <tbody>
        <tr>
          <td class="bg-dark">DATOS DEL VEHÍCULO</td>
          <td>{{ $vehiculo->placa }}</td>
          <td>{{ $vehiculo->color }}</td>
          <td>{{ $vehiculo->marca }}</td>
        </tr>
        <tr>
          <td class="bg-dark">RAZON SOCIAL</td>
          <td class="tecnico">{{ $pago->razonsocial}}</td>
          <td class="bg-dark">NIT</td>
          <td>{{$pago->nit}}</td>
        </tr>
        <tr>
          <td class="bg-dark">TÉCNICO</td>
          <td class="tecnico">{{ $tecnico->nombre }} {{ $tecnico->apellido }}</td>
          <td class="bg-dark">FECHA</td>
          <td>{{$fecha}}</td>
        </tr>
      </tbody>
    </table>

    <!-- Tabla de servicios -->
    <table class="table">
      <thead>
        <tr>
          <th colspan="4" class="td-titulo">SERVICIOS</th>
        </tr>
        <tr>
          <th class="bg-dark">Descripción</th>
          <th class="bg-dark">Cantidad</th>
          <th class="bg-dark">Precio Unitario</th>
          <th class="bg-dark">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        @foreach ($servicios as $servicio)
        <tr>
          <td>{{ $servicio->tipo }}</td>
          <td>1</td>
          <td>{{ number_format($servicio->costo, 2) }} Bs.</td>
          <td>{{ number_format($servicio->costo, 2) }} Bs.</td>
        </tr>
        @endforeach
      </tbody>
    </table>

    <!-- Tabla de productos -->
    @if ($productos->count() > 0)
    <table class="table">
      <thead>
        <tr>
          <th colspan="2" class="td-titulo">PRODUCTOS</th>
        </tr>
        <tr>
          <th>Descripción</th>
          <th>Costo</th>

        </tr>
      </thead>
      <tbody>
        @foreach ($productos as $producto)
        <tr>
          <td>{{ $producto->nombreproducto }}</td>
          <td>{{ $producto->costo }} Bs.</td>

        </tr>
        @endforeach
      </tbody>
    </table>
    @endif

    <!-- Total -->
    <table class="table">
      <thead>
        <tr>
          <th colspan="3" class="td-titulo">TOTAL</th>
          <th>
            {{ number_format(
              $servicios->sum('costo') + $productos->sum('costo'), 2)
            }} Bs.
          </th>
        </tr>
      </thead>
    </table>

  </div>

  <!-- Pie de página -->
  <div class="footer">
    <p>Gracias por su preferencia.</p>
  </div>
</body>
</html>
