import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

const Navbar = ({ setFormOpen }) => {
  //const history = useHistory(); moved to component below

  // get state from store
  const { authenticated } = useSelector((state) => state.auth);

  // function handleSignOut() { mmoved to component below

  //   history.push("/");
  // }
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img
            src="/images/logo.png"
            alt="Revents Logo"
            style={{ marginRight: "15px" }}
          />
          Re-vents
        </Menu.Item>

        <Menu.Item as={NavLink} to="/events" name="Events" />
        <Menu.Item as={NavLink} to="/test" name="Test" />
        {authenticated && (
          <Menu.Item as={NavLink} to="/create_event">
            <Button positive inverted content="Create event" />
          </Menu.Item>
        )}
        {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
};

export default Navbar;
