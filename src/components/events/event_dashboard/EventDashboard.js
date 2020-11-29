import React from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";

import { useDispatch, useSelector } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import { listenToEventsFromFirestore } from "../../../firestore/firestoreService";
import { listenToEvents } from "../../../store/actions/eventActions";

import useFirestoreCollection from "../../../hooks/useFirestoreCollection";

const EventDashboard = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);
  const { loading } = useSelector((state) => state.async);

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(),
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch],
  });

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <React.Fragment>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </React.Fragment>
        )}
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
