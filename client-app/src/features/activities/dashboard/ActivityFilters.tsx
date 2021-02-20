import React, { Fragment } from "react";
import Calendar from "react-calendar";
import { Header, Menu, Image } from "semantic-ui-react";

export default function ActivityFilters() {
  return (
    <Fragment>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 30 }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item content="All Activities" />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Header />
      <Calendar/>
    </Fragment>
  );
}
