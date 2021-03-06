import { useState } from "react";
import ReactMapGL from "react-map-gl";
import classes from "./Map.module.css";
import Sidebar from "./Sidebar";
import mapboxgl from "mapbox-gl";

mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function Map({ children }) {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    zoom: 8,
    pitch: 0,
  });

  navigator.geolocation.getCurrentPosition(success, error);

  function success(pos) {
    setViewport({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      width: window.innerWidth,
      height: window.innerHeight,
      zoom: 8,
      pitch: 0,
    });
  }
  function error() {
    console.warn("COULD NOT GET USER LOCATION");
  }

  return (
    <ReactMapGL
      {...viewport}
      className={classes.map}
      mapStyle='mapbox://styles/mapbox/dark-v9'
      onViewportChange={(nextViewport) => {
        setViewport(nextViewport);
      }}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
    >
      <Sidebar
        lng={viewport.longitude.toFixed(4)}
        lat={viewport.latitude.toFixed(4)}
        zoom={viewport.zoom.toFixed(2)}
        pitch={viewport.pitch.toFixed(2)}
      />
      {children}
    </ReactMapGL>
  );
}

export default Map;
