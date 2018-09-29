<html>
<head>
    <title>piesien.lv</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta property="og:title" content="piesien.lv" />
    <meta property="og:url" content="piesien.lv" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="Lorem ipsum og description" />
    <meta property="og:image" content="ogimage.jpg" />
    @if(Session::has('download.in.the.next.request'))
        <meta http-equiv="refresh" content="5;url={{ Session::get('download.in.the.next.request') }}">
    @endif

    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
</head>
<body>
<div>
    @yield('content')
</div>
</body>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCUtMxSNXZYS3RPeQ_4NWAXHHXmP3IpSVU&callback=initMap"></script>
<script src="https://www.gstatic.com/firebasejs/5.5.2/firebase.js"></script>
<script src="{{ mix('js/app.js') }}"></script>
</html>
