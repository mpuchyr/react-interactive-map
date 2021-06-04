import React, { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import data from './data/chicago-parks.json';

function App() {
  const [viewport, setViewport] = useState({
    latitude: 41.8781,
    longitude: -87.6298,
    width: '100vw',
    height: '100vh',
    zoom: 10
  })
  const [selectedPark, setSelectedPark] = useState(null)

  const handleClick = (e, park) => {
    e.preventDefault()
    setSelectedPark(park)
  }

  const handleClose = () => {
    setSelectedPark(null)
  }

  const displayMarkers = () => {
    return data.map((park, index) => {
      // Prevents error caused by a 'park' not having proper location data
      if (park.location.hasOwnProperty('latitude') && park.location.hasOwnProperty('longitude')) {
        const lat = parseFloat(park.location.latitude)
        const lon = parseFloat(park.location.longitude)
        return (
          <Marker 
            key={index}
            latitude={lat}
            longitude={lon}
          >
            <button onClick={(e) => handleClick(e, park)}>Park</button>
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
          {selectedPark && (
            <Popup
              latitude={parseFloat(selectedPark.location.latitude)}
              longitude={parseFloat(selectedPark.location.longitude)}
              onClose={handleClose}
            >
              <div>
                <h2>{selectedPark.park}</h2>
                <p>{selectedPark.park_address}</p>
              </div>
            </Popup>
          )}
        </ReactMapGL>
    </div>
  );
}

export default App;
