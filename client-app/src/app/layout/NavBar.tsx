import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Input, Menu } from "semantic-ui-react";

export default function NavBar() {

  return (
    <Menu secondary fixed="top">
      <Container>
        <Menu.Item as={NavLink} to='/' exact header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "1em" }}
          />
          Social Website
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities' name="Activities" />
        <Menu.Item>
          <Button as={NavLink} to='/createActivity' positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
