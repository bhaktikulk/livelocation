// import { LatLngTuple } from "leaflet";
// import { useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// function App() {
//   const [position, setPosition] = useState<LatLngTuple>([51.505, -0.09]);

//   return (
//     <>
//       <h1 className="my-4 text-center text-3xl font-semibold">
//         React Leaflet : {position[0]} : {position[1]}
//       </h1>
//       <div className="my-4 flex justify-center gap-2">
//         <input
//           className="rounded-md p-1 outline-none"
//           value={position[0]}
//           onChange={(e) =>
//             setPosition((prev) => {
//               prev[0] = Number(e.target.value);
//               return [...prev];
//             })
//           }
//         />
//         <input
//           className="rounded-md p-1 outline-none"
//           value={position[1]}
//           onChange={(e) =>
//             setPosition((prev) => {
//               prev[1] = Number(e.target.value);
//               return [...prev];
//             })
//           }
//         />
//       </div>
//       <MapContainer
//         center={position}
//         zoom={13}
//         scrollWheelZoom={false}
//         style={{ height: "30vh" }}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={position}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </>
//   );
// }

// export default App;


// import { useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import axios from "axios";

// function App() {
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [distance, setDistance] = useState("");

//   const calculateDistance = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/calculate-distance", {
//         source,
//         destination,
//       });
//       setDistance(`Distance: ${response.data.distance}, Duration: ${response.data.duration}`);
//     } catch (error) {
//       console.error("Error calculating distance:", error);
//       setDistance("Error fetching distance");
//     }
//   };

//   return (
//     <>
//       <h1 className="my-4 text-center text-3xl font-semibold">Distance Calculator</h1>
//       <div className="my-4 flex justify-center gap-2">
//         <input
//           type="text"
//           placeholder="Enter Source City"
//           className="rounded-md p-1 outline-none"
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter Destination City"
//           className="rounded-md p-1 outline-none"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />
//         <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={calculateDistance}>
//           Calculate
//         </button>
//       </div>
//       <p className="text-center">{distance}</p>
//       <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: "30vh" }}>
//         <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Marker position={[51.505, -0.09]}>
//           <Popup>Source: {source} <br /> Destination: {destination}</Popup>
//         </Marker>
//       </MapContainer>
//     </>
//   );
// }

// export default App;

// import { useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import * as turf from "@turf/turf";

// function App() {
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [distance, setDistance] = useState("");

//   const getCoordinates = async (location: string) => {
//     try {
//       const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
//       const data = await response.json();
//       if (data.length > 0) {
//         return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
//       }
//       throw new Error("Location not found");
//     } catch (error) {
//       console.error("Error fetching coordinates:", error);
//       return null;
//     }
//   };

//   const calculateDistance = async () => {
//     try {
//       const sourceCoords = await getCoordinates(source);
//       const destinationCoords = await getCoordinates(destination);
      
//       if (sourceCoords && destinationCoords) {
//         const from = turf.point([sourceCoords.lng, sourceCoords.lat]);
//         const to = turf.point([destinationCoords.lng, destinationCoords.lat]);
//         const calculatedDistance = turf.distance(from, to, { units: "kilometers" });
//         setDistance(`Distance: ${calculatedDistance.toFixed(2)} km`);
//       } else {
//         setDistance("Error fetching distance");
//       }
//     } catch (error) {
//       console.error("Error calculating distance:", error);
//       setDistance("Error fetching distance");
//     }
//   };

//   return (
//     <>
//       <h1 className="my-4 text-center text-3xl font-semibold">Distance Calculator</h1>
//       <div className="my-4 flex justify-center gap-2">
//         <input
//           type="text"
//           placeholder="Enter Source City"
//           className="rounded-md p-1 outline-none"
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter Destination City"
//           className="rounded-md p-1 outline-none"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />
//         <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={calculateDistance}>
//           Calculate
//         </button>
//       </div>
//       <p className="text-center">{distance}</p>
//       <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: "30vh" }}>
//         <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Marker position={[51.505, -0.09]}>
//           <Popup>Source: {source} <br /> Destination: {destination}</Popup>
//         </Marker>
//       </MapContainer>
//     </>
//   );
// }

// export default App;


// import { useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import axios from "axios";

// function App() {
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [distance, setDistance] = useState("");

//   const getCoordinates = async (location: string) => {
//     const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
//     if (response.data.length === 0) throw new Error("Invalid location");
//     return { lat: parseFloat(response.data[0].lat), lng: parseFloat(response.data[0].lon) };
//   };

//   const calculateDistance = async () => {
//     try {
//       const sourceCoords = await getCoordinates(source);
//       const destinationCoords = await getCoordinates(destination);

//       const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${sourceCoords.lng},${sourceCoords.lat};${destinationCoords.lng},${destinationCoords.lat}?overview=false`;

//       const response = await axios.get(osrmUrl);
//       const distanceKm = response.data.routes[0].distance / 1000; // Convert to km
//       setDistance(`Distance: ${distanceKm.toFixed(2)} km`);
//     } catch (error) {
//       console.error("Error calculating distance:", error);
//       setDistance("Error fetching distance");
//     }
//   };

//   return (
//     <>
//       <h1 className="my-4 text-center text-3xl font-semibold">Distance Calculator</h1>
//       <div className="my-4 flex justify-center gap-2">
//         <input
//           type="text"
//           placeholder="Enter Source City"
//           className="rounded-md p-1 outline-none"
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter Destination City"
//           className="rounded-md p-1 outline-none"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />
//         <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={calculateDistance}>
//           Calculate
//         </button>
//       </div>
//       <p className="text-center">{distance}</p>
//       <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: "30vh" }}>
//         <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Marker position={[51.505, -0.09]}>
//           <Popup>Source: {source} <br /> Destination: {destination}</Popup>
//         </Marker>
//       </MapContainer>
//     </>
//   );
// }

// export default App;

// import { useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import axios from "axios";

// function App() {
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [distance, setDistance] = useState("");

//   const getCoordinates = async (location: string) => {
//     const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
//     if (response.data.length === 0) throw new Error("Invalid location");
//     return { lat: parseFloat(response.data[0].lat), lng: parseFloat(response.data[0].lon) };
//   };

//   const calculateDistance = async () => {
//     try {
//       const sourceCoords = await getCoordinates(source);
//       const destinationCoords = await getCoordinates(destination);

//       const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${sourceCoords.lng},${sourceCoords.lat};${destinationCoords.lng},${destinationCoords.lat}?overview=false`;

//       const response = await axios.get(osrmUrl);
//       const distanceKm = response.data.routes[0].distance / 1000; // Convert to km
//       const durationMin = response.data.routes[0].duration / 60; // Convert to minutes

//       setDistance(`Distance: ${distanceKm.toFixed(2)} km, Duration: ${durationMin.toFixed(2)} mins`);
//     } catch (error) {
//       console.error("Error calculating distance:", error);
//       setDistance("Error fetching distance");
//     }
//   };

//   return (
//     <>
//       <h1 className="my-4 text-center text-3xl font-semibold">Distance Calculator</h1>
//       <div className="my-4 flex justify-center gap-2">
//         <input
//           type="text"
//           placeholder="Enter Source City"
//           className="rounded-md p-1 outline-none"
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter Destination City"
//           className="rounded-md p-1 outline-none"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />
//         <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={calculateDistance}>
//           Calculate
//         </button>
//       </div>
//       <p className="text-center">{distance}</p>
//       <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: "30vh" }}>
//         <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Marker position={[51.505, -0.09]}>
//           <Popup>Source: {source} <br /> Destination: {destination}</Popup>
//         </Marker>
//       </MapContainer>
//     </>
//   );
// }

// export default App;

// import { useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import axios from "axios";

// function App() {
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [distance, setDistance] = useState("");

//   const getCoordinates = async (location: string) => {
//     const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
//     if (response.data.length === 0) throw new Error("Invalid location");
//     return { lat: parseFloat(response.data[0].lat), lng: parseFloat(response.data[0].lon) };
//   };

//   const calculateDistance = async () => {
//     try {
//       const sourceCoords = await getCoordinates(source);
//       const destinationCoords = await getCoordinates(destination);

//       const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${sourceCoords.lng},${sourceCoords.lat};${destinationCoords.lng},${destinationCoords.lat}?overview=false`;

//       const response = await axios.get(osrmUrl);
//       const distanceKm = response.data.routes[0].distance / 1000; // Convert to km
//       const durationMin = response.data.routes[0].duration / 60; // Convert to minutes

//       setDistance(`Distance: ${distanceKm.toFixed(2)} km, Duration: ${durationMin.toFixed(2)} mins`);
//     } catch (error) {
//       console.error("Error calculating distance:", error);
//       setDistance("Error fetching distance");
//     }
//   };

//   const switchLocations = () => {
//     setSource(destination);
//     setDestination(source);
//   };

//   return (
//     <>
//       <h1 className="my-4 text-center text-3xl font-semibold">Distance Calculator</h1>
//       <div className="my-4 flex justify-center gap-2">
//         <input
//           type="text"
//           placeholder="Enter Source City"
//           className="rounded-md p-1 outline-none"
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//         />
//         <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={switchLocations}>
//           🔄 Switch
//         </button>
//         <input
//           type="text"
//           placeholder="Enter Destination City"
//           className="rounded-md p-1 outline-none"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />
//         <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={calculateDistance}>
//           Calculate
//         </button>
//       </div>
//       <p className="text-center">{distance}</p>
      
//       {/* Increased map size & added margin-top for spacing */}
//       <div className="mt-60">
//         <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: "4000vh", width: "700%" }}>
//           <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker position={[51.505, -0.09]}>
//             <Popup>Source: {source} <br /> Destination: {destination}</Popup>
//           </Marker>
//         </MapContainer>
//       </div>
//     </>
//   );
// }

// export default App;


// import { useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import axios from "axios";

// function App() {
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [distance, setDistance] = useState("");

//   const getCoordinates = async (location: string) => {
//     const response = await axios.get(
//       `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
//     );
//     if (response.data.length === 0) throw new Error("Invalid location");
//     return {
//       lat: parseFloat(response.data[0].lat),
//       lng: parseFloat(response.data[0].lon),
//     };
//   };

//   const calculateDistance = async () => {
//     try {
//       const sourceCoords = await getCoordinates(source);
//       const destinationCoords = await getCoordinates(destination);

//       const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${sourceCoords.lng},${sourceCoords.lat};${destinationCoords.lng},${destinationCoords.lat}?overview=false`;

//       const response = await axios.get(osrmUrl);
//       const distanceKm = response.data.routes[0].distance / 1000; // Convert to km
//       const durationMin = response.data.routes[0].duration / 60; // Convert to minutes

//       setDistance(
//         `Distance: ${distanceKm.toFixed(2)} km | Duration: ${durationMin.toFixed(2)} mins`
//       );
//     } catch (error) {
//       console.error("Error calculating distance:", error);
//       setDistance("Error fetching distance");
//     }
//   };

//   const switchLocations = () => {
//     setSource(destination);
//     setDestination(source);
//   };

//   return (
//     <div
//       style={{
//         fontFamily: "Arial, sans-serif",
//         textAlign: "center",
//         backgroundColor: "#f4f4f4",
//         padding: "20px",
//       }}
//     >
//       <h1
//         style={{
//           color: "#2c3e50",
//           fontSize: "3rem",
//           fontWeight: "bold",
//           textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
//           marginBottom: "10px",
//         }}
//       >
//         🚗 Distance Calculator
//       </h1>
//       <p
//         style={{
//           fontSize: "1.2rem",
//           color: "#555",
//           maxWidth: "600px",
//           margin: "0 auto",
//         }}
//       >
//         Enter your source and destination to calculate the driving distance and
//         estimated time. Plan your journey with ease!
//       </p>

//       <div style={{ margin: "20px auto", display: "flex", justifyContent: "center", gap: "10px" }}>
//         <input
//           type="text"
//           placeholder="Enter Source City"
//           style={{
//             padding: "10px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//             outline: "none",
//           }}
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//         />
//         <button
//           onClick={switchLocations}
//           style={{
//             padding: "10px 15px",
//             backgroundColor: "#ff9800",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           🔄 Switch
//         </button>
//         <input
//           type="text"
//           placeholder="Enter Destination City"
//           style={{
//             padding: "10px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//             outline: "none",
//           }}
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />
//       </div>

//       <button
//         onClick={calculateDistance}
//         style={{
//           padding: "12px 20px",
//           backgroundColor: "#007bff",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           fontSize: "1rem",
//           cursor: "pointer",
//           marginTop: "10px",
//         }}
//       >
//         Share Journey 🚀
//       </button>

//       <p
//         style={{
//           fontSize: "1.4rem",
//           color: "#27ae60",
//           marginTop: "15px",
//           fontWeight: "bold",
//         }}
//       >
//         {distance}
//       </p>

//       {/* Map Container with bigger size */}
//       <div style={{ marginTop: "30px", width: "100%", height: "60vh" }}>
//         <MapContainer
//           center={[51.505, -0.09]}
//           zoom={13}
//           scrollWheelZoom={false}
//           style={{ height: "100%", width: "80%", margin: "0 auto" }}
//         >
//           <TileLayer
//             attribution="&copy; OpenStreetMap"
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <Marker position={[51.505, -0.09]}>
//             <Popup>
//               Source: {source} <br /> Destination: {destination}
//             </Popup>
//           </Marker>
//         </MapContainer>
//       </div>
//     </div>
//   );
// }

// export default App;

// import { useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import axios from "axios";

// function App() {
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [distance, setDistance] = useState("");

//   const getCoordinates = async (location: string) => {
//     const response = await axios.get(
//       `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
//     );
//     if (response.data.length === 0) throw new Error("Invalid location");
//     return {
//       lat: parseFloat(response.data[0].lat),
//       lng: parseFloat(response.data[0].lon),
//     };
//   };

//   const calculateDistance = async () => {
//     try {
//       const sourceCoords = await getCoordinates(source);
//       const destinationCoords = await getCoordinates(destination);

//       const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${sourceCoords.lng},${sourceCoords.lat};${destinationCoords.lng},${destinationCoords.lat}?overview=false`;

//       const response = await axios.get(osrmUrl);
//       const distanceKm = response.data.routes[0].distance / 1000; // Convert to km
//       const durationMin = response.data.routes[0].duration / 60; // Convert to minutes

//       setDistance(
//         `Distance: ${distanceKm.toFixed(2)} km | Duration: ${durationMin.toFixed(2)} mins`
//       );
//     } catch (error) {
//       console.error("Error calculating distance:", error);
//       setDistance("Error fetching distance");
//     }
//   };

//   const switchLocations = () => {
//     setSource(destination);
//     setDestination(source);
//   };

//   return (
//     <div
//       style={{
//         fontFamily: "Arial, sans-serif",
//         textAlign: "center",
//         backgroundColor: "black",
//         padding: "20px",
//         minHeight: "100vh",
//         color: "white",
//       }}
//     >
//       <h1
//         style={{
//           fontSize: "3rem",
//           fontWeight: "bold",
//           textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
//           marginBottom: "10px",
//         }}
//       >
//         🚗 Distance Calculator
//       </h1>
//       <p
//         style={{
//           fontSize: "1.2rem",
//           color: "#bbb",
//           maxWidth: "600px",
//           margin: "0 auto",
//         }}
//       >
//         Enter your source and destination to calculate the driving distance and
//         estimated time. Plan your journey with ease!
//       </p>

//       <div style={{ margin: "20px auto", display: "flex", justifyContent: "center", gap: "10px" }}>
//         <input
//           type="text"
//           placeholder="Enter Source City"
//           style={{
//             padding: "10px",
//             borderRadius: "5px",
//             border: "1px solid #555",
//             outline: "none",
//             backgroundColor: "#222",
//             color: "white",
//           }}
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//         />
//         <button
//           onClick={switchLocations}
//           style={{
//             padding: "10px 15px",
//             backgroundColor: "#ff9800",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             transition: "all 0.3s",
//           }}
//           onMouseOver={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#0056b3")}
// onMouseOut={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#007bff")}

//         >
//           🔄 Switch
//         </button>
//         <input
//           type="text"
//           placeholder="Enter Destination City"
//           style={{
//             padding: "10px",
//             borderRadius: "5px",
//             border: "1px solid #555",
//             outline: "none",
//             backgroundColor: "#222",
//             color: "white",
//           }}
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />
//       </div>

//       <button
//         onClick={calculateDistance}
//         style={{
//           padding: "12px 20px",
//           backgroundColor: "#007bff",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           fontSize: "1rem",
//           cursor: "pointer",
//           marginTop: "10px",
//           transition: "all 0.3s",
//           boxShadow: "0px 0px 15px rgba(0, 123, 255, 0.5)",
//         }}
//         onMouseOver={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#0056b3")}
//         onMouseOut={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#007bff")}
        
//       >
//         Share Journey 🚀
//       </button>

//       <p
//         style={{
//           fontSize: "1.4rem",
//           color: "#27ae60",
//           marginTop: "15px",
//           fontWeight: "bold",
//           textShadow: "0px 0px 10px rgba(39, 174, 96, 0.8)",
//         }}
//       >
//         {distance}
//       </p>

//       {/* Map Container with bigger size */}
//       <div style={{ marginTop: "30px", width: "100%", height: "60vh" }}>
//         <MapContainer
//           center={[51.505, -0.09]}
//           zoom={13}
//           scrollWheelZoom={false}
//           style={{
//             height: "100%",
//             width: "80%",
//             margin: "0 auto",
//             filter: "brightness(80%)",
//             borderRadius: "10px",
//             boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.2)",
//           }}
//         >
//           <TileLayer
//             attribution="&copy; OpenStreetMap"
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <Marker position={[51.505, -0.09]}>
//             <Popup>
//               <span style={{ fontWeight: "bold", color: "black" }}>
//                 Source: {source} <br /> Destination: {destination}
//               </span>
//             </Popup>
//           </Marker>
//         </MapContainer>
//       </div>
//     </div>
//   );
// }

// export default App;

// import { useState, useEffect } from "react";
// import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
// import axios from "axios";

// function App() {
//   const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
//   const [source, setSource] = useState<string>("");
//   const [destination, setDestination] = useState<string>("");
//   const [distance, setDistance] = useState<string>("");
//   const [sourceCoords, setSourceCoords] = useState<{ lat: number; lng: number } | null>(null);
//   const [destinationCoords, setDestinationCoords] = useState<{ lat: number; lng: number } | null>(null);

//   // Fetch user's live location
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       console.error("Geolocation is not supported by this browser.");
//       return;
//     }

//     navigator.geolocation.watchPosition(
//       (position) => {
//         setCurrentLocation({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       },
//       (error) => {
//         console.error("Error getting live location:", error);
//       },
//       { enableHighAccuracy: true, maximumAge: 10000 }
//     );
//   }, []);

//   // Move map to new location when user's position updates
//   function MapUpdater() {
//     const map = useMap();
//     useEffect(() => {
//       if (currentLocation) {
//         map.setView([currentLocation.lat, currentLocation.lng], 13);
//       }
//     }, [currentLocation, map]);
//     return null;
//   }

//   // Get coordinates from a location string
//   const getCoordinates = async (location: string) => {
//     const response = await axios.get(
//       `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
//     );
//     if (response.data.length === 0) throw new Error("Invalid location");
//     return {
//       lat: parseFloat(response.data[0].lat),
//       lng: parseFloat(response.data[0].lon),
//     };
//   };

//   // Calculate distance between source and destination
//   const calculateDistance = async () => {
//     try {
//       const srcCoords = await getCoordinates(source);
//       const destCoords = await getCoordinates(destination);

//       setSourceCoords(srcCoords);
//       setDestinationCoords(destCoords);

//       const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${srcCoords.lng},${srcCoords.lat};${destCoords.lng},${destCoords.lat}?overview=false`;

//       const response = await axios.get(osrmUrl);
//       const distanceKm = response.data.routes[0].distance / 1000; // Convert to km
//       const durationMin = response.data.routes[0].duration / 60; // Convert to minutes

//       setDistance(
//         `Distance: ${distanceKm.toFixed(2)} km | Duration: ${durationMin.toFixed(2)} mins`
//       );
//     } catch (error) {
//       console.error("Error calculating distance:", error);
//       setDistance("Error fetching distance");
//     }
//   };

//   return (
//     <div
//       style={{
//         fontFamily: "Arial, sans-serif",
//         textAlign: "center",
//         backgroundColor: "light blue",
//         padding: "20px",
//         minHeight: "100vh",
//         color: "black",
//       }}
//     >
//       <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "10px" }}>
//         🚗 Distance Calculator with Live Location
//       </h1>

//       {/* Input fields */}
//       <div style={{ margin: "20px auto", display: "flex", justifyContent: "center", gap: "10px" }}>
//         <input
//           type="text"
//           placeholder="Enter Source City"
//           style={{ padding: "10px", borderRadius: "5px", outline: "none" }}
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter Destination City"
//           style={{ padding: "10px", borderRadius: "5px", outline: "none" }}
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />
//       </div>

//       <button
//         onClick={calculateDistance}
//         style={{
//           padding: "12px 20px",
//           backgroundColor: "#007bff",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           fontSize: "1rem",
//           cursor: "pointer",
//           marginTop: "10px",
//         }}
//       >
//         Calculate Distance 🚀
//       </button>

//       <p style={{ fontSize: "1.2rem", color: "#27ae60", marginTop: "10px", fontWeight: "bold" }}>
//         {distance}
//       </p>

//       {/* Map */}
//       <div style={{ marginTop: "30px", width: "100%", height: "60vh" }}>
//         <MapContainer
//           center={currentLocation || [51.505, -0.09]}
//           zoom={13}
//           scrollWheelZoom={false}
//           style={{ height: "100%", width: "80%", margin: "0 auto", borderRadius: "10px" }}
//         >
//           <MapUpdater />
//           <TileLayer
//             attribution="&copy; OpenStreetMap"
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {/* Live Location Marker */}
//           {currentLocation && (
//             <Marker position={[currentLocation.lat, currentLocation.lng]}>
//               <Popup>📍 Your Live Location</Popup>
//             </Marker>
//           )}

//           {/* Source Marker */}
//           {sourceCoords && (
//             <Marker position={[sourceCoords.lat, sourceCoords.lng]}>
//               <Popup>🚩 Source: {source}</Popup>
//             </Marker>
//           )}

//           {/* Destination Marker */}
//           {destinationCoords && (
//             <Marker position={[destinationCoords.lat, destinationCoords.lng]}>
//               <Popup>🏁 Destination: {destination}</Popup>
//             </Marker>
//           )}
//         </MapContainer>
//       </div>
//     </div>
//   );
// }

// export default App;

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

  // Get coordinates from a location string
 const getCoordinates = async (location: string) => {
  const response = await axios.get(
    `https://livelocation-back.vercel.app/geocode?location=${location}`
  );
  if (!response.data || response.data.length === 0) throw new Error("Invalid location");
  return response.data; // Assuming backend returns { lat, lng }
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
