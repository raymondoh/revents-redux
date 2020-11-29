import React from "react";
import EventListItem from "./EventListItem";

const EventList = ({ events }) => {
  const renderList =
    events &&
    events.map((event) => {
      return <EventListItem key={event.id} event={event} />;
    });
  return <React.Fragment>{renderList}</React.Fragment>;
};

export default EventList;
