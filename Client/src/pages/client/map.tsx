import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD8Ju-O68NBMNIPwArDNTkWTJwFODrRkAA",
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div style={{ height: "200", width: "200" }}>
        <div>Mapa</div>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          zoom={8}
          center={{ lat: 4.60971, lng: -74.08175 }}
        >
          <Marker position={{ lat: 4.60971, lng: -74.08175 }} />
        </GoogleMap>
      </div>
    </>
  );
}
