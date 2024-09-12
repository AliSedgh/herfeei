import React, { useEffect, useRef } from "react";
import { Map, View } from "@neshan-maps-platform/ol";
import Image from "next/image";
import { fromLonLat, toLonLat } from "ol/proj"; // Import toLonLat
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

const MyMap = ({ location, onLocationChange }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // Reference to the map object

  useEffect(() => {
    const initializeMap = () => {
      if (mapContainerRef.current) {
        const mapInstance = new Map({
          key: "web.205a9b6cbf084598b3930066cf0f442a",
          target: mapContainerRef.current,
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: fromLonLat([location.lng, location.lat]),
            zoom: 11,
          }),
        });

        mapInstance.setMapType("neshan");
        mapInstance.switchTrafficLayer(true);

        // Event listener for map click
        mapInstance.on("click", handleMapClick);

        // Save the map instance to the ref
        mapRef.current = mapInstance;
      }
    };

    initializeMap();

    return () => {
      // Cleanup code when component unmounts
      if (mapRef.current) {
        // Remove the click event listener
        mapRef.current.un("click", handleMapClick);
        // Dispose the map
        mapRef.current.dispose();
      }
    };
  }, [location, onLocationChange]);

  const handleMapClick = (event) => {
    const clickedCoordinate = event.coordinate;
    const [longitude, latitude] = toLonLat(clickedCoordinate);
    onLocationChange({ lat: latitude, lng: longitude });
  };

  const handleCenterButtonClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        onLocationChange({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.error("جئولوکیشن بوسیله این مرورگر پشتیبانی نمی‌شود.");
      }
    );
  };

  return (
    <div className="w-full rounded-xl overflow-hidden">
      <div
        ref={mapContainerRef}
        className="map-container rounded-xl overflow-hidden"
        style={{ height: "400px" }}
      />

      <div
        className="my-3 rounded-xl flex items-center bg-[#EFEFEF] cursor-pointer"
        onClick={handleCenterButtonClick}
      >
        <Image
          className="bg-[#F2F3F7] rounded-lg p-[.4rem] cursor-pointer m-3"
          src="/icons/current-location.svg"
          width={32}
          height={32}
          alt="Current Location"
        />
        <div>
          <p className="mt-2 mb-0 text-[#1A1D1F] text-base font-semibold">
            مکان فعلی من
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyMap;
