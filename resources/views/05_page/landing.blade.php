<?php
$description = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consequat, magna ac lacinia consequat, lacus dolor molestie lacus, id malesuada lacus ante eget lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis auctor, turpis molestie porta aliquet, purus felis scelerisque ante, ut ultricies est ante sit amet massa.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consequat, magna ac lacinia consequat, lacus dolor molestie lacus, id malesuada lacus ante eget lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis auctor, turpis molestie porta aliquet, purus felis scelerisque ante, ut ultricies est ante sit amet massa.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consequat, magna ac lacinia consequat, lacus dolor molestie lacus, id malesuada lacus ante eget lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis auctor, turpis molestie porta aliquet, purus felis scelerisque ante, ut ultricies est ante sit amet massa.</p>';

$benefits = [
    [
        'title' => 'For cyclists',
        'type' => 'steps',
        'content' => [
            [
                'title' => 'See',
                'txt' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            ],
            [
                'title' => 'Vote',
                'txt' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            ],
            [
                'title' => 'Let',
                'txt' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            ],
            [
                'title' => 'Enjoy',
                'txt' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            ],
        ]
    ],
    [
        'title' => 'For cyclists',
        'type' => 'features',
        'content' => [
            'Increase',
            'Brand',
            'Do social',
            'Good',
            'Awareness',
        ]
    ]
];

$footer = [
    'copyrights' => '© '.date('Y').' Rūgstošo nedrīkst'
]
?>

@extends('04_template.default')

@section('content')
    @include('03_organism/nav-line')
    <div class="container-fluid">
        <div class="row row__hero justify-content-md-center">
            @include('01_atom/responsive-img', [
                'img' => [
                    'aspect' => '56.25%',
                    'url' => 'https://via.placeholder.com/1600x900/3F51B5',
                    'alt' => 'hero'
                ]
            ])
            <div class="col-sm-12 d-flex justify-content-around align-items-center flex-column flex-md-row">
                @include('01_atom/choice-btn', [
                    'btn' => [
                        'url' => '/map',
                        'txt' => __('landing.request')
                    ]
                ])
                @include('01_atom/choice-btn', [
                    'btn' => [
                        'url' => '/map',
                        'txt' => __('landing.request')
                    ]
                ])
            </div>
        </div>
    </div>
    <div class="container">

        @include('03_organism.description', ['data' => $description])

        @each('03_organism.benefits', $benefits, 'benefit')

    </div>
    @include('03_organism.footer', ['data' => $footer])
@endsection
