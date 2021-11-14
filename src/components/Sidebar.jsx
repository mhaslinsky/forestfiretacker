import classes from "./Sidebar.module.css";

function Sidebar({ lng, lat, zoom, pitch }) {
  return (
    <div className={classes.sidebar}>
      Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | Pitch: {pitch}
    </div>
  );
}

export default Sidebar;
