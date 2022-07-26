import "./App.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMapEvents,
} from "react-leaflet";
import Side from "./components/Side";
import axios from "axios";
import ListPositions from "./components/ListPositions";

const API_URL = "http://localhost:5000/positions/";

function App() {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [positions, setPositions] = useState([]);

  const fetchPositions = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setPositions(data);
    } catch (error) {
      console.log("Failed to fetch the positions", error);
    }
  };

  const deletePosition = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, { id });
    if (response.status === 200) {
      fetchPositions();
    }
    return `${response.status}: ${response.statusText}`;
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          let { lat, lng } = marker.getLatLng();
          lat = parseFloat(lat.toFixed(3));
          lng = parseFloat(lng.toFixed(3));
          setPosition([lat, lng]);
        }
      },
    }),
    []
  );
  function LocationMarker() {
    const map = useMapEvents({
      click(props) {
        map.locate(props);
      },
      locationfound(e) {
        setPosition(map.getCenter());
        map.flyTo(map.getCenter(), map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker
        position={position}
        pane={"markerPane"}
        draggable={true}
        autoPanOnFocus={true}
        ref={markerRef}
        eventHandlers={eventHandlers}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    );
  }
  return (
    <div className="container">
      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
      <div className="side">
        <Side position={position} setPositions={setPositions} />
        <ListPositions
          positions={positions}
          deletePosition={deletePosition}
          setPosition={setPosition}
        />
      </div>
    </div>
  );
}

export default App;
