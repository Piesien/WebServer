<div id="legend">
    <h2>Legend</h2>
    <ul class="legend-items">
        @foreach($legend_items as $legend_item)
            <li class="legend-item">
                <img src="{{ $legend_item['src'] }}" alt="{{ $legend_item['alt'] }}" class="legend-img">
                <span>{{ $legend_item['title'] }}</span>
            </li>
        @endforeach
    </ul>
</div>