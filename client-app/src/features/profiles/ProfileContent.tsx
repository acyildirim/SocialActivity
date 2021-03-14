import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import ProfileAbout from "./ProfileAbout";
import ProfilePhotos from "./ProfilePhotos";

interface Props {
  profile : Profile;
}

export default observer(function ProfileContent({profile} : Props) {
  const panes = [
    {
      menuItem: { key: "About", icon: "info", content: "About" },
      render: () => <ProfileAbout/>,
    },
    {
      menuItem: { key: "Photos", icon: "camera retro", content: "Photos" },
      render: () => <ProfilePhotos profile={profile}/>,
    },

    {
      menuItem: { key: "Events", icon: "clipboard list", content: "Events" },
      render: () => <Tab.Pane>Events Content</Tab.Pane>,
    },
    {
      menuItem: { key: "Followers", icon: "users", content: "Followers" },
      render: () => <Tab.Pane>Followers Content</Tab.Pane>,
    },
    {
      menuItem: { key: "Following", icon: "add user", content: "Following" },
      render: () => <Tab.Pane>Following Content</Tab.Pane>,
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
})
