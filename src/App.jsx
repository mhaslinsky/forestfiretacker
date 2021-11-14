import React, { useEffect } from "react";
import { Marker } from "react-map-gl";
import Loading from "./components/Loading";
import Map from "./components/Map";
import { useState } from "react";
import { Icon } from "@iconify/react";
import LocationInfoBox from "./components/LocationInfoBox";
import classes from "./App.module.css";

function App() {
  const [locationInfo, setLocationInfo] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const res = await fetch(
        "https://eonet.sci.gsfc.nasa.gov/api/v2.1/events"
      );
      const { events } = await res.json();
      setEventData(events);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const markers = React.useMemo(
    () =>
      eventData.map((ev) => {
        if (ev.categories[0].id === 8) {
          return (
            <Marker
              longitude={ev.geometries[0].coordinates[0]}
              latitude={ev.geometries[0].coordinates[1]}
              onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
            >
              <Icon
                icon='fontisto:map-marker-alt'
                color='#750014'
                height='auto'
              />
            </Marker>
          );
        }
        return null;
      }),
    [eventData]
  );

  return (
    <div className={classes.container}>
      {!loading ? <Map>{markers}</Map> : <Loading></Loading>}
      {locationInfo && <LocationInfoBox info={locationInfo} />}
    </div>
  );
}

export default App;
