/* eslint-disable */
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZWFsZ2VwcmVtIiwiYSI6ImNtNm1pN29udjBsdTIyanM4a2x4amNqNXEifQ.wHWNUc7QIO42qJ4nUJzLiw';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/ealgeprem/cm6n2o6sd00q101qxa5wxge6s', // style URL
    center: [-118.108751, 34.084853], // starting position [lng, lat]
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
