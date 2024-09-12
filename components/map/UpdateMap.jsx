import { MapComponent, MapTypes } from "@neshan-maps-platform/mapbox-gl-react";
import "@neshan-maps-platform/mapbox-gl-react/dist/style.css";
import {
  Marker,
  FullscreenControl,
  GeolocateControl,
} from "@neshan-maps-platform/mapbox-gl";

export default function updateMap({ location, onLocationChange, className }) {
  let currentMarker = null;

  const mapSetterHandler = (map) => {
    // Add initial marker
    currentMarker = new Marker({ color: "#4574F8" })
      .setLngLat([location.lng, location.lat])
      .addTo(map);

    // Add geolocation and fullscreen controls
    map.addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
        showUserLocation: true,
        showAccuracyCircle: false,
      })
    );
    map.addControl(
      new FullscreenControl({
        container: window.document.getElementById("mapParent"),
      })
    );

    // Handle map click event
    map.on("click", (e) => {
      // Remove the current marker if it exists
      if (currentMarker) {
        currentMarker.remove();
      }

      // Add a new marker at the clicked location
      currentMarker = new Marker({ color: "#4574F8" })
        .setLngLat(e.lngLat)
        .addTo(map);

      // Update the location state
      onLocationChange({
        lat: e.lngLat.lat.toFixed(6),
        lng: e.lngLat.lng.toFixed(6),
      });
    });
  };

  return (
    <MapComponent
      options={{
        mapKey: "web.205a9b6cbf084598b3930066cf0f442a",
        mapType: MapTypes.neshanVector,
        center: { lng: location.lng, lat: location.lat },
        zoom: 14,
        mapTypeControllerOptions: { show: false },
      }}
      mapSetter={(map) => mapSetterHandler(map)}
      className={`w-full h-full relative max-h-[90%] ${className}`}
    />
  );
}
