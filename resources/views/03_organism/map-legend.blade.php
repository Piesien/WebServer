<div id="legend">
    <h2>Legend</h2>
    <ul class="legend-items" id="legend-items">
        @foreach($legend_items as $legend_item)
            <li class="legend-item" data-type="{{ $legend_item['type'] }}">
                <img src="{{ $legend_item['src'] }}" alt="{{ $legend_item['alt'] }}" class="legend-img">
                <span>{{ $legend_item['title'] }}</span>
            </li>
        @endforeach
        <li class="legend-item" data-type="clear">
            <span>Clear filter</span>
        </li>
    </ul>
</div>