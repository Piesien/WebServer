<?php
$form_fields = [
    [
        'class' => 'col-sm-12 col-md-6',
        'type' => 'text',
        'name' => 'name',
        'label' => 'vārds, uzvārds, nosaukums',
    ],
    [
        'class' => 'col-sm-12 col-md-6',
        'type' => 'email',
        'name' => 'email',
        'label' => 'epasts',
    ]
]
?>
@extends('04_template.default')

@section('content')
    @include('03_organism/nav-line')
    <form action="/dl">
    <div class="container form-container">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="page-title">Aizpildi formu un saņem dokumentu</h1>
            </div>
            @foreach($form_fields as $field)
                <div class="form-group {{ $field['class'] }}">
                    <label for="{{ $field['name'] }}">{{ $field['label'] }}</label>
                    <input type="{{ $field['type'] }}" class="form-control" id="{{ $field['name'] }}" placeholder="{{ $field['label'] }}">
                </div>
            @endforeach
            <div class="col-sm-12 col-md-6">
                <button type="submit" class="btn btn-primary">Iesniegt</button>
            </div>
        </div>
    </div>
    </form>
@endsection
