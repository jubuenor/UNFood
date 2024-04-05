import React from "react";
import { useEffect, useState } from "react";
import { addLocation, getCurrentLocation } from "@/utils/currentLocation";
import Loading from "./Loading";
import { Nav } from "react-bootstrap";
import { BiMap } from "react-icons/bi";
function Location() {
  const [currentLocation, setCurrentLocation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentLocation(getCurrentLocation()?.toString()!== ""?"Ubicación guardada":"Sin ubicación");
  }, []);

  const getCurrentPosition = () => {
    console.log("Getting current position");
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  };

  const success = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const loc = `${latitude}, ${longitude}`;
    setCurrentLocation('Ubicación guardada');
    addLocation(loc);
    setLoading(false);
  };

  const error = () => {
    console.log("Unable to retrieve your location");
    setLoading(false);
  };
  return (
    <>
        {loading ? <Loading></Loading> : null}
        <Nav.Link className="text-center" onClick={getCurrentPosition}>
          <BiMap size={25} />
          <span className="ms-2" >
            {currentLocation}
          </span>
        </Nav.Link>
    </>
  );
}

export default Location;
