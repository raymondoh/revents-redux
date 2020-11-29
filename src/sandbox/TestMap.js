import React from "react";
import GoogleMapReact from "google-map-react";
const MY_KEY = process.env.REACT_APP_API_KEY;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function TestMap({ location }) {
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${MY_KEY}` }}
        center={location.center}
        zoom={location.zoom}
      >
        <AnyReactComponent
          lat={location.center.lat}
          lng={location.center.lng}
          text="Hey, I'm here!"
        />
      </GoogleMapReact>
    </div>
  );
}

export default TestMap;
