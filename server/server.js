// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// // Function to get coordinates from city name
// const getCoordinates = async (city) => {
//   try {
//     const response = await axios.get(
//       `https://maps.googleapis.com/maps/api/geocode/json`,
//       {
//         params: { address: city, key: GOOGLE_MAPS_API_KEY },
//       }
//     );
//     const location = response.data.results[0]?.geometry.location;
//     if (!location) throw new Error("Location not found");
//     return [location.lat, location.lng];
//   } catch (error) {
//     throw new Error("Error fetching coordinates");
//   }
// };

// // Function to calculate distance using Haversine formula
// const haversineDistance = (coords1, coords2) => {
//   const [lat1, lon1] = coords1;
//   const [lat2, lon2] = coords2;
//   const R = 6371; // Radius of Earth in km
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return (R * c).toFixed(2);
// };

// // API to calculate distance
// app.post("/get-distance", async (req, res) => {
//   try {
//     const { source, destination } = req.body;
//     if (!source || !destination)
//       return res.status(400).json({ error: "Source and Destination required" });

//     const sourceCoords = await getCoordinates(source);
//     const destinationCoords = await getCoordinates(destination);
//     const distance = haversineDistance(sourceCoords, destinationCoords);

//     res.json({
//       message: "Distance calculated successfully!",
//       source,
//       destination,
//       distance: `${distance} km`,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// function haversineDistance(coord1, coord2) {
//   const R = 6371; // Earth radius in km
//   const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
//   const dLng = (coord2.lng - coord1.lng) * (Math.PI / 180);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(coord1.lat * (Math.PI / 180)) *
//       Math.cos(coord2.lat * (Math.PI / 180)) *
//       Math.sin(dLng / 2) *
//       Math.sin(dLng / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }

// app.post("/calculate-distance", (req, res) => {
//   const { source, destination } = req.body;
//   const distance = haversineDistance(source, destination);
//   res.json({ distance });
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Function to get latitude and longitude from a city name
// const getCoordinates = async (city) => {
//   try {
//     const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
//       params: {
//         q: city,
//         format: "json",
//         limit: 1,
//       },
//     });

//     if (response.data.length === 0) {
//       throw new Error(`Location not found for: ${city}`);
//     }

//     return {
//       lat: parseFloat(response.data[0].lat),
//       lng: parseFloat(response.data[0].lon),
//     };
//   } catch (error) {
//     console.error(`Error fetching coordinates for ${city}:`, error.message);
//     throw error;
//   }
// };

// // Function to calculate distance using the Haversine formula
// function haversineDistance(coord1, coord2) {
//   const R = 6371; // Earth radius in km
//   const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
//   const dLng = (coord2.lng - coord1.lng) * (Math.PI / 180);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(coord1.lat * (Math.PI / 180)) *
//       Math.cos(coord2.lat * (Math.PI / 180)) *
//       Math.sin(dLng / 2) *
//       Math.sin(dLng / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Distance in km
// }

// // API to calculate distance between two locations
// app.post("/calculate-distance", async (req, res) => {
//   try {
//     const { source, destination } = req.body;

//     if (!source || !destination) {
//       return res.status(400).json({ error: "Source and destination are required" });
//     }

//     // Get coordinates for both locations
//     const sourceCoords = await getCoordinates(source);
//     const destinationCoords = await getCoordinates(destination);

//     // Calculate distance
//     const distance = haversineDistance(sourceCoords, destinationCoords);

//     res.json({ 
//       distance: `${distance.toFixed(2)} km`, 
//       sourceCoords, 
//       destinationCoords 
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Error calculating distance" });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// const express = require("express");
// const cors = require("cors");
// const turf = require("@turf/turf");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Function to calculate distance using Turf.js
// const calculateDistance = (source, destination) => {
//   const from = turf.point([source.lng, source.lat]);
//   const to = turf.point([destination.lng, destination.lat]);
//   return turf.distance(from, to, { units: "kilometers" }); // Accurate distance in km
// };

// app.post("/calculate-distance", async (req, res) => {
//   try {
//     const { source, destination } = req.body;
//     if (!source || !destination) {
//       return res.status(400).json({ error: "Source and destination are required" });
//     }

//     const distance = calculateDistance(source, destination);
//     res.json({ distance: `${distance.toFixed(2)} km` });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running! Use POST /calculate-distance to get distances.");
});

// API to calculate real-world distance
app.post("/calculate-distance", async (req, res) => {
  try {
    const { source, destination } = req.body;
    if (!source || !destination) {
      return res.status(400).json({ error: "Source and destination are required" });
    }

    const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${source.lng},${source.lat};${destination.lng},${destination.lat}?overview=false`;

    const response = await axios.get(osrmUrl);
    const distance = response.data.routes[0].distance / 1000; // Convert to km

    res.json({ distance: `${distance.toFixed(2)} km` });

  } catch (error) {
    console.error("OSRM error:", error);
    res.status(500).json({ error: "Error calculating route" });
  }
});

// const PORT = process.env.PORT || 5001; // Change 5000 to 5001
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open in browser: \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
});

