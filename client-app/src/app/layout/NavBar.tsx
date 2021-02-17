import React from "react";
import { Button, Container, Input, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {

  const {activityStore} = useStore();

  return (
    <Menu secondary fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "1em" }}
          />
          Social Website
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={() => activityStore.openForm()} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
