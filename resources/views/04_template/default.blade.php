<html>
<head>
    <title>piesien.lv</title>
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
</head>
<body>
<div>
    @yield('content')
</div>
</body>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCUtMxSNXZYS3RPeQ_4NWAXHHXmP3IpSVU&callback=initMap"
        async defer></script>
<script src="{{ mix('js/bundle.js') }}"></script>
</html>
