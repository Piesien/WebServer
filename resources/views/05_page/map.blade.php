<?php
$legend_items = [
    [
        'src' => '/img/ic_place_exists.png',
        'alt' => 'Existing bicycle parking spot',
        'title' => 'Existing bicycle parking spot',
        'type' => 'exists'
    ],
    [
        'src' => '/img/ic_place_needed.png',
        'alt' => 'Needed bicycle parking spot',
        'title' => 'Needed bicycle parking spot',
        'type' => 'needed'
    ]
];
?>
@extends('04_template.default')

@section('content')
    @include('03_organism/map-legend', ['legend_items' => $legend_items])
    <div id="map"></div>
@endsection
