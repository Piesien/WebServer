<html>
<head>
    <title>piesien.lv</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
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
