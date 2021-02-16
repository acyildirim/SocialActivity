import React from "react";
import { Button, Container, Input, Menu } from "semantic-ui-react";
interface Props {
  openForm: () => void;
}
export default function NavBar({ openForm }: Props) {
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
          <Button onClick={openForm} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
