<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reporte de Servicios {{$desde}} al {{$hasta}}</title>
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

        .content h2, h4{
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
        .text-center{
          text-align: center;
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
  @php
    $costo = 0;
    $comision = 0;
    $ingreso = 0;
    $costoProducto = 0;
    $costoProductoPersonal = 0;
    $Totalgasto = 0;
    $totalDeuda = 0;
    $gastoEfectivo = 0;
  @endphp
  <!-- Encabezado con logotipo y fecha -->
  <div class="header">
    <img src="{{ public_path('img/logolavadero.png') }}" alt="Logotipo" class="logo">
    <p>{{ \Carbon\Carbon::now()->format('d/m/Y H:i:s') }}</p>
  </div>

  <!-- Contenido del recibo -->
  <div class="content">
    <h4 >Reporte de Servicios {{$desde}} al {{$hasta}}</h4>

    <!-- Datos de lAvada -->
    @if(count($lavados) > 0)
    <table class="table">

        <thead>
          <tr class="text-center">
            <td class="bg-dark text-center" colspan="5">DETALLE DE SERVICIOS</td>
          </tr>
          <tr>
            <td class="bg-dark text-start">#</td>
            <td class="bg-dark">Nombre Tecnico</td>
            <td class="bg-dark">Costo Servicios</td>
            <td class="bg-dark">Comision</td>
            <td class="bg-dark">Ingreso</td>
          </tr>


        </thead>
        <tbody>
          @php
           $i = 1;

          @endphp
          @foreach ($lavados as $servicio)

          <tr>
            <td>{{$i}}</td>
            <td>{{$servicio->personal}}</td>
            <td>{{number_format($servicio->total_costo,2) }} Bs.</td>
            <td>{{number_format($servicio->total_comision,2)}} Bs.</td>
            <td>{{number_format($servicio->total_ingreso,2)}} Bs.</td>
          </tr>
            @php
              $costo += $servicio->total_costo;
              $comision += $servicio->total_comision;
              $ingreso += $servicio->total_ingreso;
              $i++;
            @endphp
          @endforeach

          <tr>
            <td class="bg-dark" colspan="2">TOTAL</td>
            <td>{{ number_format($costo, 2) }} Bs.</td>
            <td>{{ number_format($comision, 2) }} Bs.</td>
            <td>{{ number_format($ingreso, 2) }} Bs.</td>
          </tr>
        </tbody>
    </table>
    @endif
    <!-- Datos de Prodcuto Vendido por servicio -->
    @if(count($productoServicio) > 0)
    <table class="table">

        <thead>
          <tr class="text-center">
            <td class="bg-dark text-center" colspan="4">DETALLE PRODUCTOS VENDIDOS</td>
          </tr>
          <tr>
            <td class="bg-dark text-start">#</td>
            <td class="bg-dark">Producto</td>
            <td class="bg-dark">Cantidad</td>
            <td class="bg-dark">Costo</td>
          </tr>


        </thead>
        <tbody>
          @php
            $i = 1;


          @endphp
          @foreach ($productoServicio as $prodServ)

          <tr>
            <td>{{$i}}</td>
            <td>{{$prodServ->nombreproducto}}</td>
            <td>{{number_format($prodServ->cantidad,2) }}</td>
            <td>{{number_format($prodServ->total_costo,2)}} Bs.</td>
          </tr>
            @php
              $costoProducto += $prodServ->total_costo;
              $i++;
            @endphp
          @endforeach

          <tr>
            <td class="bg-dark" colspan="3">TOTAL</td>
            <td>{{ number_format($costoProducto, 2) }} Bs.</td>
          </tr>
        </tbody>
    </table>
    @endif
    <!-- Datos de Producto Personal -->
    @if(count($productoPersonal) > 0)

    <table class="table">

        <thead>
          <tr class="text-center">
            <td class="bg-dark text-center" colspan="4">DETALLE PRODUCTOS VENDIDOS AL PERSONAL</td>
          </tr>
          <tr>
            <td class="bg-dark text-start">#</td>
            <td class="bg-dark">Producto</td>
            <td class="bg-dark">Cantidad</td>
            <td class="bg-dark">Costo</td>
          </tr>


        </thead>
        <tbody>
          @php
            $i = 1;


          @endphp
          @foreach ($productoPersonal as $prodPer)

          <tr>
            <td>{{$i}}</td>
            <td>{{$prodPer->nombreproducto}}</td>
            <td>{{number_format($prodPer->cantidad,2) }}</td>
            <td>{{number_format($prodPer->total_costo,2)}} Bs.</td>
          </tr>
            @php
              $costoProductoPersonal += $prodPer->total_costo;
              $i++;
            @endphp
          @endforeach

          <tr>
            <td class="bg-dark" colspan="3">TOTAL</td>
            <td>{{ number_format($costoProductoPersonal, 2) }} Bs.</td>
          </tr>
        </tbody>
    </table>
    @endif

    @if(count($deuda) > 0)

    <table class="table">

        <thead>
          <tr class="text-center">
            <td class="bg-dark text-center" colspan="3">COBRO DE DEUDA</td>
          </tr>
          <tr>
            <td class="bg-dark text-start">#</td>
            <td class="bg-dark">Personal</td>
            <td class="bg-dark">Total</td>
          </tr>


        </thead>
        <tbody>
          @php
            $i = 1;


          @endphp
          @foreach ($deuda as $deuda)

          <tr>
            <td>{{$i}}</td>
            <td>{{$deuda->personal}}</td>
            <td>{{number_format($deuda->total,2) }} Bs.</td>
          </tr>
            @php
              $totalDeuda += $deuda->total;
              $i++;
            @endphp
          @endforeach

          <tr>
            <td class="bg-dark" colspan="2">TOTAL</td>
            <td>{{ number_format($totalDeuda, 2) }} Bs.</td>
          </tr>
        </tbody>
    </table>
    @endif
    <!-- Datos de Gastos -->
    @if(count($gastos) > 0)
    <table class="table">

        <thead>
          <tr class="text-center">
            <td class="bg-dark text-center" colspan="4">DETALLE DE GASTOS</td>
          </tr>
          <tr>
            <td class="bg-dark text-start">#</td>
            <td class="bg-dark">Personal</td>
            <td class="bg-dark">Metodo de Pago</td>
            <td class="bg-dark">Total</td>
          </tr>


        </thead>
        <tbody>
          @php
            $i = 1;


          @endphp
          @foreach ($gastos as $gasto)
            @php
                 $Totalgasto += $gasto->total;
                 if($gasto->metodo_pago == 'efectivo') {
                     $gastoEfectivo += $gasto->total;
                 }
             @endphp
          <tr>
            <td>{{$i++}}</td>
            <td>{{$gasto->personal}}</td>
            <td>{{$gasto->metodo_pago}}</td>
            <td>{{number_format($gasto->total,2)}} Bs.</td>
          </tr>

          @endforeach

          <tr>
            <td class="bg-dark" colspan="3">TOTAL</td>
            <td>{{ number_format($Totalgasto, 2) }} Bs.</td>
          </tr>
        </tbody>
    </table>
    @endif
    @php
        $pagoQr = 0;
        $pagoEfectivo = 0;
        $pagoCreditoPendiente = 0;

        foreach ($metodoPagoLavado as $pagolavado) {
            if (in_array($pagolavado->metodo_pago, ['pendiente', 'credito'])) {
                $pagoCreditoPendiente += $pagolavado->total_costo;
            } elseif ($pagolavado->metodo_pago === 'efectivo') {
                $pagoEfectivo += $pagolavado->total_costo;
            } elseif ($pagolavado->metodo_pago === 'qr') {
                $pagoQr += $pagolavado->total_costo;
            }
        }
        foreach ($metodoPadoServicio as $pagoservicio) {
            if (in_array($pagoservicio->metodo_pago, ['pendiente', 'credito'])) {
                $pagoCreditoPendiente += $pagoservicio->total_costo;
            } elseif ($pagoservicio->metodo_pago === 'efectivo') {
                $pagoEfectivo += $pagoservicio->total_costo;
            } elseif ($pagoservicio->metodo_pago === 'qr') {
                $pagoQr += $pagoservicio->total_costo;
            }
        }
        $ingresos = $costo + $costoProducto + $costoProductoPersonal + $totalDeuda;
        $egresos = $comision + $gastoEfectivo + $pagoCreditoPendiente;
    @endphp

    <table class="table">

        <thead>
          <tr class="text-center">
            <td class="bg-dark text-center" colspan="6">DEMOSTRACION</td>
          </tr>
          <tr class="text-center">
            <td class="bg-dark" colspan="2">INGRESOS (I)</td>
            <td class="bg-dark" colspan="2">EGRESOS (E)</td>
            <td class="bg-dark" colspan="2">METODOS DE PAGO</td>
          </tr>


        </thead>
        <tbody>
          <tr>
            <td class="bg-dark">Detalle</td>
            <td class="bg-dark">Monto</td>
            <td class="bg-dark">Detalle</td>
            <td class="bg-dark">Monto</td>
            <td class="bg-dark">Detalle</td>
            <td class="bg-dark">Monto</td>
          </tr>
          <tr>
            <td class="bg-dark">Lavado</td>
            <td>{{ number_format($costo, 2) }} Bs.</td>
            <td class="bg-dark">Comision</td>
            <td>{{ number_format($comision, 2) }} Bs.</td>
            <td class="bg-dark">Pagos QR</td>
            <td>{{number_format($pagoQr, 2) }} Bs.</td>
          </tr>
          <tr>
            <td class="bg-dark">Productos</td>
            <td>{{ number_format($costoProducto, 2) }} Bs.</td>
            <td class="bg-dark">Gastos</td>
            <td>{{ number_format($gastoEfectivo, 2) }} Bs.</td>
            <td class="bg-dark">Total Efectivo</td>
            <td>{{number_format($pagoEfectivo, 2) }} Bs.</td>
          </tr>
          <tr>
            <td class="bg-dark">Insumos/Deudas </td>
            <td>{{ number_format(($costoProductoPersonal + $totalDeuda), 2) }} Bs.</td>
            <td class="bg-dark">Pendiente/Credito</td>
            <td>{{ number_format($pagoCreditoPendiente, 2) }} Bs.</td>
            <td class="bg-dark">I-E (Ingresos-Egresos)</td>
            <td class="bg-dark">{{number_format(($ingresos-$egresos), 2) }} Bs.</td>
          </tr>
          <tr>
            <td class="bg-dark"><strong>TOTAL INGRESO</strong> </td>
            <td>{{ number_format($ingresos, 2) }} Bs.</td>
            <td class="bg-dark"><strong>TOTAL EGRESOS</strong></td>
            <td>{{ number_format($egresos, 2) }} Bs.</td>
            <td class="bg-dark"><strong>EFECTIVO EN CAJA</strong></td>
            <td>{{ number_format((($ingresos-$egresos)-$pagoQr), 2) }} Bs.</td>

          </tr>

        </tbody>
    </table>


</body>
</html>
