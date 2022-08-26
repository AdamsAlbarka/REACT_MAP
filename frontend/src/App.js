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
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
 
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRsZXJzIiwiYSI6ImNsNzNvdGY4dDBndGM0MG53dzBlNnk4cDcifQ.vZ78yh-2-_kgd0vv6d5eXw';

function App() {
  const myStorage = window.localStorage
  const [pins, setPins] = useState([])
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [rating, setRating] = useState(0)
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [currentPlace, setCurrentPlace] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [newPlace, setNewPlace] = useState(null)
  // const [viewport, setViewport] = useState();

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

  const handleAddClick = (e) => {
    const [ long, lat ] = e.lngLat.toArray()
    setNewPlace({
      long, 
      lat
    }) 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long
    }

    try{
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null)
    }
    catch (err){
      console.log(err)
    }

  }

  const handleLogout = () => {
    myStorage.removeItem("user")
    setCurrentUser(null)
  }

  return (

    <Map
    initialViewState={{
      latitude: 47.040182,
      longitude: 17.071727,
      zoom: 4,
    }}
    style={{width: "100vw", height: "100vh"}}
     mapStyle="mapbox://styles/mapbox/streets-v9"
     onDblClick={handleAddClick}
     transitionDuration="200"
    >

      {pins.map(p => (
        <div key={p._id}>
 
       <Marker 
            longitude={p.long} 
            latitude={p.lat} 
            // offsetLeft={-viewport.zoom * 3.5}
            // offsetTop={-viewport.zoom * 7}
            anchor="bottom" >
       <RoomIcon className='roomIcon' 
                 style={{
                  fontSize:"3rem",
                  color:p.username === currentUser ? "tomato" : "slateblue"}} 
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
              {Array(p.rating).fill(<Star className='star'/>)}      
            </div>
            <label>Information</label>
            <span className='username'>created by <b>{p.username}</b></span>
            <span className='date'>{timeago.format(p.createdAt)}</span>
          </div>
      </Popup> 
            )}
    </div>
    ))}
{ newPlace && (

  <Popup 
      longitude={newPlace.long} 
      latitude={newPlace.lat}
      anchor="left"
      onClose={() => setCurrentPlace(null)}
      >
   <div>
                <form 
                onSubmit={handleSubmit}
                >
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Rating</label>
                  <select 
                  onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>    
  </Popup>
)}
        {currentUser ? ( 
        <button className='button logout' onClick={handleLogout}>Log Out</button>) : 
        (
          <div className='buttons'>
          <button className='button login' onClick={() => setShowLogin(true)}>Log in</button>
          <button className='button register' onClick={() => setShowRegister(true)}>Register</button>
        </div>
        ) }

          {showRegister && ( <Register setShowRegister ={setShowRegister}/>)}
          {showLogin && ( <Login setShowLogin={ setShowLogin } myStorage={myStorage} setCurrentUser={setCurrentUser} /> )}
        
        
      </Map>

  );
}

export default App;