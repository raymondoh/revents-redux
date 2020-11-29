import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../store/actions/modalActions";

import {
  decrementCounter,
  incrementCounter,
} from "../store/actions/testActions";
import TestMap from "./TestMap";
import TestPlaceInput from "./TestPlaceInput";

function TestComponent() {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null)
  const data = useSelector((state) => state.test.data);
  const {loading} = useSelector(state => state.async)

  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  const [location, setLocation] = useState(defaultProps);
  function handleSetLocation(latLng) {
    setLocation({ ...location, center: { lat: latLng.lat, lng: latLng.lng } });
  }

  return (
    <div>
      <h2>Tesing 123</h2>
      <h3>The data is: {data}</h3>
      <Button
      name="increment"
      loading={loading && target === "increment"}
        onClick={(e) => {
          dispatch(incrementCounter(50))
          setTarget(e.target.name)
        }}
        content="Increment"
        color="red"
      />
      <Button
      name="decrement"
      loading={loading && target === "decrement"}
      onClick={(e) => {
        dispatch(decrementCounter(100))
        setTarget(e.target.name)
      }}
        content="Decrement"
        color="blue"
      />
      <Button
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
        content="Open Modal"
        color="teal"
      />

      <div style={{ marginTop: "15px" }}>
        <TestPlaceInput setLocation={handleSetLocation} />
        <TestMap location={location} />
      </div>
    </div>
  );
}

export default TestComponent;
