import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { listenToEventFromFirestore } from "../../../firestore/firestoreService";
import useFirestoreDoc from "../../../hooks/useFirestoreDoc";
import { listenToEvents } from "../../../store/actions/eventActions";
import LoadingComponent from "../../../utils/LoadingComponent";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";

function EventDetailedPage(props) {
  const dispatch = useDispatch();
  const event = useSelector((state) =>
    state.events.events.find((event) => event.id === props.match.params.id)
  );
  console.log(event);
  const { loading, error } = useSelector((state) => state.async);

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(props.match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [props.match.params.id, dispatch],
  });

  if (loading || (!event && !error))
    return <LoadingComponent content="Loading event..." />;
  if (error) return <Redirect to="/error" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event && event.attendees} />
      </Grid.Column>
    </Grid>
  );
}

export default EventDetailedPage;
