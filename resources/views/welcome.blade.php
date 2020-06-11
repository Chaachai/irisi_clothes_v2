<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>IRISI Clothes</title>
    <!-- <link rel="icon" type="image/png" href="{!! asset('images/logo_square.png') !!}" /> -->
    <link rel="icon" href="{{ URL::asset('images/logo_square.png') }}" type="image/x-icon" />
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">



</head>

<body >
    <div id="app"></div>
    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>