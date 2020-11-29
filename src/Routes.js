import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import EventDetailedPage from "./components/events/event_detailed/EventDetailedPage";
import EventDashboard from "./components/events/event_dashboard/EventDashboard";
import EventForm from "./components/events/event_form/EventForm";
import HomePage from "./components/home/HomePage";
import Navbar from "./components/nav/Navbar";
import ModalManager from "./utils/modals/ModalManager";
import TestComponent from "./sandbox/TestComponent";
import ErrorComponent from "./utils/errors/ErrorComponent";
import AccountPage from "./components/auth/AccountPage";

import { useSelector } from "react-redux";
import LoadingComponent from "./utils/LoadingComponent";
import ProfilePage from "./components/profiles/profile_page/ProfilePage";

const Routes = () => {
  const { key } = useLocation();
  const { initialised } = useSelector((state) => state.async);

  if (!initialised) return <LoadingComponent content="Loading App..." />;
  return (
    <React.Fragment>
      <ModalManager />
      <ToastContainer position="bottom-right" hideProgressBar />
      <Route path="/" exact component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <React.Fragment>
            <Navbar />
            <Container className="main">
              <Switch>
                <Route
                  path={["/create_event", "/manage/:id"]}
                  exact
                  component={EventForm}
                  key={key}
                />
                <Route path="/events/:id" exact component={EventDetailedPage} />
                <Route path="/events" exact component={EventDashboard} />
                <Route path="/test" exact component={TestComponent} />
                <Route path="/account" exact component={AccountPage} />
                <Route path="/profile/:id" exact component={ProfilePage} />
                <Route path="/error" exact component={ErrorComponent} />
              </Switch>
            </Container>
          </React.Fragment>
        )}
      />
    </React.Fragment>
  );
};

export default Routes;
