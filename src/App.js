import React, { useState } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import data from './data/chicago-parks.json';

function App() {
  const [viewport, setViewport] = useState({
    latitude: 41.8781,
    longitude: -87.6298,
    width: '100vw',
    height: '100vh',
    zoom: 10
  })

  const displayMarkers = () => {
    return data.map((park) => {
      if (park.location.hasOwnProperty('latitude') && park.location.hasOwnProperty('longitude')) {
        const lat = parseFloat(park.location.latitude)
        const lon = parseFloat(park.location.longitude)
        return (
          <Marker 
            latitude={lat}
            longitude={lon}
          >
            Park
          </Marker>
        )
      } else {
        return <></>
      }
      })

  }



  return (
    <div className="App">
 
      <ReactMapGL 
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mpuchyr/ckpiqwzd20yft17o9ibej6lic"
          onViewportChange={(viewport) => {
            setViewport(viewport)
          }}
        >
          {displayMarkers()}
        </ReactMapGL>
    </div>
  );
}

export default App;
