<div class="row">
    <div class="row benefits">
        <div class="col-sm-12">
            <h2>{{ $benefit['title'] }}</h2>
        </div>
        @if($benefit['type'] == 'steps')
            @each('02_molecule.step', $benefit['content'], 'step')
        @elseif($benefit['type'] == 'features')
            <div class="col-sm-12">
                @include('02_molecule.features', ['features' => $benefit['content']])
            </div>
        @endif
    </div>
</div>