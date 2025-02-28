

import { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline, useMap } from "react-leaflet";
import axios from "axios";

function App() {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [sourceCoords, setSourceCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]); // Stores polyline coordinates

  // Fetch user's live location
  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting live location:", error);
      },
      { enableHighAccuracy: true, maximumAge: 10000 }
    );
  };

  // Move map to new location when user's position updates
  function MapUpdater() {
    const map = useMap();
    useEffect(() => {
      if (currentLocation) {
        map.setView([currentLocation.lat, currentLocation.lng], 13);
      }
    }, [currentLocation, map]);
    return null;
  }

 const BACKEND_URL = "https://livelocation-back.vercel.app"; // Your deployed backend URL

const getCoordinates = async (location: string) => {
  const response = await axios.get(`${BACKEND_URL}/geocode?location=${encodeURIComponent(location)}`);

  if (!response.data.lat || !response.data.lng) throw new Error("Invalid location");

  return {
    lat: response.data.lat,
    lng: response.data.lng,
  };
};



  // Calculate distance and draw route
  const calculateDistance = async () => {
    try {
      const srcCoords = await getCoordinates(source);
      const destCoords = await getCoordinates(destination);

      setSourceCoords(srcCoords);
      setDestinationCoords(destCoords);

      const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${srcCoords.lng},${srcCoords.lat};${destCoords.lng},${destCoords.lat}?overview=full&geometries=geojson`;

      const response = await axios.get(osrmUrl);
      const distanceKm = response.data.routes[0].distance / 1000; // Convert to km
      const durationMin = response.data.routes[0].duration / 60; // Convert to minutes

      setDistance(
        `Distance: ${distanceKm.toFixed(2)} km | Duration: ${durationMin.toFixed(2)} mins`
      );

      // Extract polyline coordinates
      const routeCoordinates = response.data.routes[0].geometry.coordinates.map(
        ([lng, lat]: [number, number]) => [lat, lng]
      );
      setRouteCoords(routeCoordinates);
    } catch (error) {
      console.error("Error calculating distance:", error);
      setDistance("Error fetching distance");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        backgroundColor: "lightblue",
        padding: "20px",
        minHeight: "100vh",
        color: "black",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "10px" }}>
        🚗 Distance Calculator with Live Location
      </h1>

      {/* Input fields */}
      <div style={{ margin: "20px auto", display: "flex", justifyContent: "center", gap: "10px" }}>
        <input
          type="text"
          placeholder="Enter Source City"
          style={{ padding: "10px", borderRadius: "5px", outline: "none" }}
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Destination City"
          style={{ padding: "10px", borderRadius: "5px", outline: "none" }}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "10px" }}>
        <button
          onClick={fetchCurrentLocation}
          style={{
            padding: "12px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          📍 Current Location
        </button>

        <button
          onClick={calculateDistance}
          style={{
            padding: "12px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Calculate Distance 🚀
        </button>
      </div>

      <p style={{ fontSize: "1.2rem", color: "black", marginTop: "10px", fontWeight: "bold" }}>
        {distance}
      </p>

      {/* Map */}
      <div style={{ marginTop: "30px", width: "100%", height: "60vh" }}>
        <MapContainer
          center={currentLocation || [51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "80%", margin: "0 auto", borderRadius: "10px" }}
        >
          <MapUpdater />
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Live Location Marker */}
          {currentLocation && (
            <Marker position={[currentLocation.lat, currentLocation.lng]}>
              <Popup>📍 Your Live Location</Popup>
            </Marker>
          )}

          {/* Source Marker */}
          {sourceCoords && (
            <Marker position={[sourceCoords.lat, sourceCoords.lng]}>
              <Popup>🚩 Source: {source}</Popup>
            </Marker>
          )}

          {/* Destination Marker */}
          {destinationCoords && (
            <Marker position={[destinationCoords.lat, destinationCoords.lng]}>
              <Popup>🏁 Destination: {destination}</Popup>
            </Marker>
          )}

          {/* Red Polyline for Route */}
          {routeCoords.length > 0 && <Polyline positions={routeCoords} color="red" />}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
