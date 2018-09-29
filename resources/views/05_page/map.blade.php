<?php
$legend_items = [
    [
        'src' => '/img/ic_place_exists.png',
        'alt' => 'Existing bicycle parking spot',
        'title' => 'Existing bicycle parking spot',
    ],
    [
        'src' => '/img/ic_place_needed.png',
        'alt' => 'Needed bicycle parking spot',
        'title' => 'Needed bicycle parking spot',
    ]
];
?>
@extends('04_template.default')

@section('content')
    <div id="map-body">
        @include('03_organism/map-legend', ['legend_items' => $legend_items])
        <div id="map"></div>
        <div id="sidebar">
            <h3>Most popular</h3>
            <hr>
            <div id="list"></div>
        </div>
    </div>
@endsection
