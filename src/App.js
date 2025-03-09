// import React, { useState } from 'react';
// import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
// import * as togeojson from '@tmcw/togeojson';
// import 'leaflet/dist/leaflet.css';
// import './App.css';

// function App() {
//   const [geoJsonData, setGeoJsonData] = useState(null);
//   const [summary, setSummary] = useState(null);
//   const [details, setDetails] = useState(null);

//   // Handle file upload
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const text = e.target.result;
//       const parser = new DOMParser();
//       const xmlDoc = parser.parseFromString(text, 'text/xml');
//       const geoJson = togeojson.kml(xmlDoc);
//       setGeoJsonData(geoJson);
//       analyzeKML(geoJson);
//     };
//     reader.readAsText(file);
//   };

//   // Analyze KML content
//   const analyzeKML = (geoJson) => {
//     const summaryData = {
//       Point: 0,
//       LineString: 0,
//       MultiLineString: 0,
//       Polygon: 0,
//       GeometryCollection: 0
//     };
    
//     const detailedData = [];

//     geoJson.features.forEach(feature => {
//       const type = feature.geometry.type;
//       summaryData[type] = (summaryData[type] || 0) + 1;

//       if (type === 'LineString' || type === 'MultiLineString' || type === 'GeometryCollection') {
//         const length = calculateLength(feature.geometry);
//         detailedData.push({
//           type,
//           length: length.toFixed(2)
//         });
//       }
//     });

//     setSummary(summaryData);
//     setDetails(detailedData);
//   };

//   // Calculate length of lines
//   const calculateLength = (geometry) => {
//     const toRadians = (degrees) => degrees * Math.PI / 180;
//     const R = 6371; // Earth's radius in km

//     let totalLength = 0;

//     if (geometry.type === 'LineString') {
//       const coords = geometry.coordinates;
//       for (let i = 0; i < coords.length - 1; i++) {
//         const [lon1, lat1] = coords[i];
//         const [lon2, lat2] = coords[i + 1];
//         const dLat = toRadians(lat2 - lat1);
//         const dLon = toRadians(lon2 - lon1);
//         const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//                   Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
//                   Math.sin(dLon/2) * Math.sin(dLon/2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//         totalLength += R * c;
//       }
//     } else if (geometry.type === 'MultiLineString' || geometry.type === 'GeometryCollection') {
//       const coordsArray = geometry.type === 'MultiLineString' 
//         ? geometry.coordinates 
//         : geometry.geometries.map(g => g.type === 'LineString' ? g.coordinates : []);
//       coordsArray.forEach(coords => {
//         for (let i = 0; i < coords.length - 1; i++) {
//           const [lon1, lat1] = coords[i];
//           const [lon2, lat2] = coords[i + 1];
//           const dLat = toRadians(lat2 - lat1);
//           const dLon = toRadians(lon2 - lon1);
//           const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//                     Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
//                     Math.sin(dLon/2) * Math.sin(dLon/2);
//           const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//           totalLength += R * c;
//         }
//       });
//     }
//     return totalLength;
//   };

//   return (
//     <div className="App">
//       <h1>KML Viewer</h1>
      
//       <div className="controls">
//         <input 
//           type="file" 
//           accept=".kml" 
//           onChange={handleFileUpload}
//         />
        
//         <button 
//           onClick={() => document.getElementById('summary')?.scrollIntoView()}
//           disabled={!summary}
//         >
//           Show Summary
//         </button>
        
//         <button 
//           onClick={() => document.getElementById('details')?.scrollIntoView()}
//           disabled={!details}
//         >
//           Show Details
//         </button>
//       </div>

//       <div className="map-container">
//         <MapContainer 
//           center={[51.505, -0.09]} 
//           zoom={13} 
//           style={{ height: '400px', width: '100%' }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           {geoJsonData && (
//             <GeoJSON 
//               data={geoJsonData}
//               style={() => ({
//                 color: '#ff7800',
//                 weight: 2,
//                 opacity: 0.65
//               })}
//             />
//           )}
//         </MapContainer>
//       </div>

//       {summary && (
//         <div id="summary" className="summary">
//           <h2>Summary</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Element Type</th>
//                 <th>Count</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.entries(summary).map(([type, count]) => (
//                 count > 0 && (
//                   <tr key={type}>
//                     <td>{type}</td>
//                     <td>{count}</td>
//                   </tr>
//                 )
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {details && details.length > 0 && (
//         <div id="details" className="details">
//           <h2>Detailed View</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Element Type</th>
//                 <th>Length (km)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {details.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.type}</td>
//                   <td>{item.length}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import * as togeojson from '@tmcw/togeojson';
import 'leaflet/dist/leaflet.css';
import './App.css';
import { FaUpload, FaChartBar, FaList, FaMapMarkedAlt } from 'react-icons/fa';

function App() {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [details, setDetails] = useState(null);
  const [filename, setFilename] = useState('');
  const [activeTab, setActiveTab] = useState('map');

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFilename(file.name);
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target.result;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        const geoJson = togeojson.kml(xmlDoc);
        setGeoJsonData(geoJson);
        analyzeKML(geoJson);
      };
      reader.readAsText(file);
    }
  };

  // Analyze KML content
  const analyzeKML = (geoJson) => {
    const summaryData = {
      Point: 0,
      LineString: 0,
      MultiLineString: 0,
      Polygon: 0,
      GeometryCollection: 0
    };
    
    const detailedData = [];

    geoJson.features.forEach(feature => {
      const type = feature.geometry.type;
      summaryData[type] = (summaryData[type] || 0) + 1;

      if (type === 'LineString' || type === 'MultiLineString' || type === 'GeometryCollection') {
        const length = calculateLength(feature.geometry);
        detailedData.push({
          type,
          length: length.toFixed(2)
        });
      }
    });

    setSummary(summaryData);
    setDetails(detailedData);
  };

  // Calculate length of lines
  const calculateLength = (geometry) => {
    const toRadians = (degrees) => degrees * Math.PI / 180;
    const R = 6371; // Earth's radius in km

    let totalLength = 0;

    if (geometry.type === 'LineString') {
      const coords = geometry.coordinates;
      for (let i = 0; i < coords.length - 1; i++) {
        const [lon1, lat1] = coords[i];
        const [lon2, lat2] = coords[i + 1];
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        totalLength += R * c;
      }
    } else if (geometry.type === 'MultiLineString' || geometry.type === 'GeometryCollection') {
      const coordsArray = geometry.type === 'MultiLineString' 
        ? geometry.coordinates 
        : geometry.geometries.map(g => g.type === 'LineString' ? g.coordinates : []);
      coordsArray.forEach(coords => {
        for (let i = 0; i < coords.length - 1; i++) {
          const [lon1, lat1] = coords[i];
          const [lon2, lat2] = coords[i + 1];
          const dLat = toRadians(lat2 - lat1);
          const dLon = toRadians(lon2 - lon1);
          const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                    Math.sin(dLon/2) * Math.sin(dLon/2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          totalLength += R * c;
        }
      });
    }
    return totalLength;
  };

  const getTotalLengthSum = () => {
    if (!details || details.length === 0) return 0;
    return details.reduce((sum, item) => sum + parseFloat(item.length), 0).toFixed(2);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1><FaMapMarkedAlt className="header-icon" /> KML Viewer</h1>
        <p className="subtitle">Visualize and analyze your KML files with ease</p>
      </header>
      
      <div className="upload-section">
        <div className="file-upload-container">
          <label className="file-upload-label">
            <input 
              type="file" 
              accept=".kml" 
              onChange={handleFileUpload}
              className="file-input"
            />
            <span className="upload-button">
              <FaUpload className="button-icon" /> Choose KML File
            </span>
          </label>
          {filename && <p className="filename">Selected: {filename}</p>}
        </div>
      </div>

      {geoJsonData && (
        <div className="content-container">
          <div className="tab-navigation">
            <button 
              className={`tab-button ${activeTab === 'map' ? 'active' : ''}`}
              onClick={() => setActiveTab('map')}
            >
              <FaMapMarkedAlt className="tab-icon" /> Map View
            </button>
            <button 
              className={`tab-button ${activeTab === 'summary' ? 'active' : ''}`}
              onClick={() => setActiveTab('summary')}
              disabled={!summary}
            >
              <FaChartBar className="tab-icon" /> Summary
            </button>
            <button 
              className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
              disabled={!details || details.length === 0}
            >
              <FaList className="tab-icon" /> Details
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'map' && (
              <div className="map-container">
                <MapContainer 
                  center={[51.505, -0.09]} 
                  zoom={13} 
                  style={{ height: '500px', width: '100%' }}
                  className="map"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <GeoJSON 
                    data={geoJsonData}
                    style={() => ({
                      color: '#3498db',
                      weight: 3,
                      opacity: 0.8
                    })}
                  />
                </MapContainer>
              </div>
            )}

            {activeTab === 'summary' && summary && (
              <div className="card summary-card">
                <h2 className="card-title">KML Elements Summary</h2>
                <div className="element-count-summary">
                  {Object.entries(summary).map(([type, count]) => (
                    count > 0 && (
                      <div key={type} className="element-count-item">
                        <div className="element-type">{type}</div>
                        <div className="element-count">{count}</div>
                      </div>
                    )
                  ))}
                </div>
                <table className="summary-table">
                  <thead>
                    <tr>
                      <th>Element Type</th>
                      <th>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(summary).map(([type, count]) => (
                      count > 0 && (
                        <tr key={type}>
                          <td>{type}</td>
                          <td>{count}</td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'details' && details && details.length > 0 && (
              <div className="card details-card">
                <h2 className="card-title">Length Details</h2>
                <div className="total-length">
                  <span>Total Length:</span> {getTotalLengthSum()} km
                </div>
                <table className="details-table">
                  <thead>
                    <tr>
                      <th>Element Type</th>
                      <th>Length (km)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.map((item, index) => (
                      <tr key={index}>
                        <td>{item.type}</td>
                        <td>{item.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {!geoJsonData && (
        <div className="empty-state">
          <FaMapMarkedAlt className="empty-icon" />
          <p>Upload a KML file to visualize and analyze it</p>
        </div>
      )}

      <footer className="app-footer">
      <p>© 2025 KML Viewer | Crafted with ❤️ by <strong>Chandra Prakash</strong></p>
      </footer>
    </div>
  );
}

export default App;