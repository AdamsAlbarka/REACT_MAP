import * as React from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import "./app.css"


import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const [lat, setLat] = useState(37.8)
  const [long, setLong] = useState(-122.4)
  const [showPopup, setShowPopup] = React.useState(true);

  return (
    <div className='App'>
      <Map
        initialViewState={{
          latitude:lat,
          longitude:long,
          zoom: 4
        }}
        style={{
          width: "100vw", 
          height: "100vh",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"

        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        >

        <Marker 
        longitude={long} 
        latitude={lat} 
        color="red" 
        offsetLeft={-20}
        offsetTop={-10}
        />

      {showPopup && (
      <Popup 
        longitude={long} 
        latitude={lat}
        anchor="left"
        // onClose={() => setShowPopup(false)}
        >
          <div className='card'>
            <label>Place</label>
            <h4>Eiffel Tower</h4>
            <label>Review</label>
            <p className='desc'>Beautiful place to be</p>
            <label>Rating</label>
            <div className='stars'>

              <StarIcon  className='star' />
              <StarIcon  className='star'/>
              <StarIcon  className='star'/>
              <StarIcon className='star' />
              <StarIcon  className='star'/>

            </div>
            <label>Information</label>
             <span className='username'>
              Created by
              <b>Adlers</b>
             </span>

             <span className='date'>
                1 hour ago
             </span>

          </div>
      </Popup>)}
      </Map>
    
    </div>
  );
}

export default App;




// const [viewport, setViewport] = useState({
//   width: "100vw",
//   height: "100vh",
//   latitude: 46,
//   longitute: 17,
//   zoom:4
// })

// return (
//   <div className='App'>
//     <ReactMapGL>
//       {...viewport}
//       map
//     </ReactMapGL>