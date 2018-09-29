<?php
$form = [
    [
        'class' => 'col-sm-12 col-md-6',
        'field_type' => 'text',
        'field_name' => 'name',
        'field_label' => 'vārds, uzvārds, nosaukums',
    ]
]
?>
@extends('04_template.default')

@section('content')
    @include('03_organism/nav-line')
    <form>
    <div class="container form-container">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="page-title">Aizpildi formu un saņem dokumentu</h1>
            </div>
            <div class="form-group col-sm-12 col-md-6">
                <label for="exampleInputPassword1">Password</label>
                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <div class="form-group col-sm-12 col-md-6">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group col-sm-12 col-md-6">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <div class="col-sm-12 col-md-6">
                <button type="submit" class="btn btn-primary">Iesniegt</button>
            </div>
        </div>
    </div>
    </form>
@endsection
