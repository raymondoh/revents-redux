import React from "react";
import { Item, Segment } from "semantic-ui-react";

const EventDetailedSidebar = ({ attendees }) => {
  return (
    <React.Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees.length}
        {""} {attendees.length > 1 ? " people" : " person"}
        {""} going
      </Segment>
      <Segment attached>
        {attendees.map((attendee) => (
          <Item.Group relaxed divided key={attendee.id}>
            <Item style={{ position: "relative" }}>
              <Item.Image
                size="tiny"
                src={attendee.photoURL || "/images/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <span>{attendee.displayName}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          </Item.Group>
        ))}
      </Segment>
    </React.Fragment>
  );
};

export default EventDetailedSidebar;
