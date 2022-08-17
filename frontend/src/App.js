import * as React from 'react';
import ReactMapGL, {Marker, Popup, } from 'react-map-gl';
import { useState, useEffect } from 'react';
import {Star, Room } from '@mui/icons-material';
import "./app.css"
import axios from "axios"
import { format } from "timeago.js"

import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const [pins, setPins] = useState([])
  const [currentUsername, setCurrentUsername] = useState('Adlers')
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4,
  });


  // useEffect(() => {
  //   const getPins = async () => {
  //     try {
  //       const allPins = await axios.get("/pins");
  //       setPins(allPins.data); 
  //     } catch (error) {
  //       console.log(error.response.data);
  //     }
  //   };
  //   getPins();
  // }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken=""
      width="100%"
      height="100%"
      transitionDuration="200"
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      onViewportChange={(viewport) => setViewport(viewport)}
      // onDblClick={currentUsername && handleAddClick}
    >
      {pins.map((p) => (
        <>
          <Marker
            latitude={p.lat}
            longitude={p.long}
            offsetLeft={-3.5 * viewport.zoom}
            offsetTop={-7 * viewport.zoom}
          >
            <Room
              style={{
                fontSize: 7 * viewport.zoom,
                color: currentUsername === p.username ? "tomato" : "slateblue",
                cursor: "pointer",
              }}
              // onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
            />
          </Marker>
          {p._id === currentPlaceId && (
            <Popup
              key={p._id}
              latitude={p.lat}
              longitude={p.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
              anchor="left"
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">{p.title}</h4>
                <label>Review</label>
                <p className="desc">{p.desc}</p>
                <label>Rating</label>
                <div className="stars">
                  {Array(p.rating).fill(<Star className="star" />)}
                </div>
                <label>Information</label>
                <span className="username">
                  Created by <b>{p.username}</b>
                </span>
                <span className="date">{format(p.createdAt)}</span>
              </div>
            </Popup>
          )}
        </>
      ))}
      </ReactMapGL>
</div>
  );
}

export default App;