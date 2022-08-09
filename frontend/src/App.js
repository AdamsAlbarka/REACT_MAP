import * as React from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import "./app.css"
import axios from "axios"

import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const [pins, setPins] = useState([])

useEffect(() => {
  const getPins = async () => {
    try {
      const res = await axios.get("/pins");
      setPins(res.data)
    } catch (err) {
      console.log(err);
    }
  } 
  getPins()
}, [])


  return (
    <div className='App'>
      <Map
        initialViewState={{
          latitude:-200,
          longitude:-120,
          zoom: 4
        }}
        style={{
          width: "100vw", 
          height: "100vh",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"

        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        >
      {pins.map(p => (
        <>
        
        <Marker 
        longitude={p.long} 
        latitude={p.lat} 
        color="red" 
        offsetLeft={-20}
        offsetTop={-10}
        />

      <Popup 
        longitude={p.long} 
        latitude={p.lat}
        anchor="left"
        >
          <div className='card'>
            <label>Place</label>
            <h4>{p.title}</h4>
            <label>Review</label>
            <p className='desc'>{p.desc}</p>
            <label>Rating</label>
            <div className='stars'>

              <StarIcon  className='star'/>
              <StarIcon  className='star'/>
              <StarIcon  className='star'/>
              <StarIcon  className='star'/>
              <StarIcon  className='star'/>

            </div>
            <label>Information</label>
             <span className='username'>
              Created by
              <b>{p.username}</b>
             </span>

             <span className='date'>
                1 hour ago
             </span>

          </div>
      </Popup>
          </>
        ))}
      
      </Map>
    
    </div>
  );
}

export default App;