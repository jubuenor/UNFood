import {Location} from "../types/location";

async function fetchLocationName(currentLocation: Location){
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation.lat},${currentLocation.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        return "Nombre de ubicación no encontrado";
      }
    } catch (error) {
      console.error("Error fetching location name:", error);
    }
}

export default fetchLocationName;