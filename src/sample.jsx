import React, { useState, useEffect } from 'react';
import ReactFileReader from 'react-file-reader';
// import boundaryCoordinates from "./map.geojson"

function MapComponent() {
  const [boundaryCoordinates, setBoundaryCoordinates] = useState(null);

  // useEffect(() => {

  //   var reader = new FileReader();
  //   reader.onload = function(e) {
  //       // Use reader.result
  //       setBoundaryCoordinates(reader.result);
  //   }
  //   reader.readAsText('/Users/Indhuja/Downloads/map.geojson');

  //   // const fetchGeoJSON = async () => {
  //   //   try {
  //   //     const response = await fetch('/Users/Indhuja/Downloads/map.geojson');
  //   //     if (!response.ok) {
  //   //       throw new Error('Failed to fetch GeoJSON file');
  //   //     }
  //   //     const geoJSONData = await response.json();
        
  //   //     // Extract boundary coordinates from GeoJSON
  //   //     const coordinates = geoJSONData.features[0].geometry.coordinates[0];
        
  //   //     // Store the boundary coordinates in state
  //   //     setBoundaryCoordinates(geoJSONData);
  //   //   } catch (error) {
  //   //     console.error('Error fetching GeoJSON:', error);
  //   //   }
  //   // };

  //   // fetchGeoJSON();
  // }, []);

  const handleFiles = (files) => {
    var reader = new FileReader();
      reader.onload = function(e) {
          // Use reader.result
          
          setBoundaryCoordinates(JSON.parse(reader.result));
      }
      reader.readAsText(files[0]);
  }


  return (
    // <div>
    //   {boundaryCoordinates && (
    //     <div>
    //       <h2>Boundary Coordinates</h2>
    //       <ul>
    //         {Object.entries(boundaryCoordinates).map((key, value) => (
    //           <div key={key}>
    //           <ul>
    //             {Object.entries(value).map(([subKey, subValue]) => (
    //               <p key={subKey}>
    //                 <strong>{subKey}: </strong>
    //                 {JSON.stringify(subValue)}
    //               </p>
    //             ))}
    //           </ul>
    //         </div>
    //         ))}
    //       </ul>
    //     </div>
    //   )}
    // </div>
    <div>
    <h2>GeoJSON Data</h2>
    <ReactFileReader handleFiles={handleFiles} fileTypes={'.geojson'}>
      <button className='btn'>Upload</button>
    </ReactFileReader>
    {boundaryCoordinates && (
      <div>
        {boundaryCoordinates.features.map((feature, index) => (
          <div key={index}>
            <h3>Feature {index + 1}</h3>
            <ul>
              {feature.geometry.coordinates.map((coordinate, i) => (
                <li key={i}>{JSON.stringify(coordinate)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}
  </div>
  );
}

export default MapComponent;

