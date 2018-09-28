@extends('04_template.default')

@section('content')
    <div class="hero">
        @include('01_atom/choice-btn', [
            'btn' => [
                'url' => '/map',
                'txt' => __('landing.request')
            ]
        ])
        @include('01_atom/choice-btn', [
            'btn' => [
                'url' => '/map',
                'txt' => __('landing.claim')
            ]
        ])
    </div>
@endsection
