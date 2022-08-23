import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { useState, useEffect } from 'react';
import {Star } from '@mui/icons-material';
import RoomIcon from '@mui/icons-material/Room';
import "./app.css"
import axios from "axios"
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import * as timeago from 'timeago.js';
 
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRsZXJzIiwiYSI6ImNsNzNvdGY4dDBndGM0MG53dzBlNnk4cDcifQ.vZ78yh-2-_kgd0vv6d5eXw';

function App() {
  const [pins, setPins] = useState([])
  const [currentPlace, setCurrentPlace] = useState([])
  const currentUser = "Adlers"


  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data); 
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlace(id)
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
    <Map
     initialViewState={{
      latitude: 47.040182,
      longitude: 17.071727,
      zoom: 4,
    }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      // onViewportChange={(viewport) => setViewport(viewport)}
    >

      {pins.map(p => (
        <>
       <Marker longitude={p.long} latitude={p.lat} 
       offsetLeft={-20}
       offsetTop={-10}
       anchor="bottom" >
       <RoomIcon className='roomIcon' 
                 style={{color:p.username === currentUser ? "tomato" : "slateblue"}} 
                 onClick={() => handleMarkerClick(p._id)} /> 
       </Marker>
       
        {p._id === currentPlace && (
       <Popup 
       longitude={p.long} 
       latitude={p.lat}
       anchor="left"
       onClose={() => setCurrentPlace(null)}
       >
          <div className='card'>
            <label >Place</label>
            <h4 className='place'>{p.title}</h4>
            <label>Review</label>
            <p>{p.desc}</p>
            <label>Rating</label>
            <div className='stars'>
              <Star className='star'/>
              <Star className='star'/>
              <Star className='star'/>
              <Star className='star'/>
              <Star className='star'/>
            </div>
            <label>Information</label>
            <span className='username'>created by <b>{p.username}</b></span>
            <span className='date'>{timeago.format(p.createdAt)}</span>
          </div>
      </Popup> 
            )}
    </>
    ))}
      </Map>
</div>
  );
}

export default App;