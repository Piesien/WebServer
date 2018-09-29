@extends('04_template.default')

@section('content')
    @include('03_organism/nav-line')
    <div class="container" style="margin-top:66px;">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="page-title">Thank you for using our service!</h1>
            </div>
            <div class="col-sm-12">
                <p>If your download doesn't start then <a href="/dl">Click here</a></p>
            </div>
            <div class="col-sm-12">
                <a href="/"> back to map!</a>
            </div>
        </div>
    </div>
@endsection