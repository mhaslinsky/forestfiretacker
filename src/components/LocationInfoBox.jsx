import classes from "./LocationInfoBox.module.css";

function LocationInfoBox({ info }) {
  return (
    <div className={classes.location}>
      <h2> Event Details:</h2>
      <ul>
        <li>
          ID: <strong>{info.id}</strong>
        </li>
        <li>
          Title: <strong>{info.title}</strong>
        </li>
      </ul>
    </div>
  );
}
export default LocationInfoBox;
