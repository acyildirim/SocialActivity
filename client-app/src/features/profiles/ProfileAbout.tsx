import React, { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ProfileEditForm from "./ProfileEditForm";

export default function ProfileAbout() {
  const {
    profileStore: { isCurrentUser, profile },
  } = useStore();
  const [editMode, setEditMode] = useState(false);
  return (
    <div>
      <Tab.Pane>
        <Grid>
          <Grid.Column width="16">
            <Header
              floated="left"
              icon="user"
              content={`About ${profile?.displayName}`}
            />
            {isCurrentUser && (
              <Button
                floated="right"
                basic
                content={editMode ? "Cancel" : "Edit Profile"}
                onClick={() => setEditMode(!editMode)}
              />
            )}
          </Grid.Column>
          <Grid.Column width="16">
            {editMode ? (
              <ProfileEditForm setEditMode={setEditMode} />
            ) : (
              <span style={{ whiteSpace: "pre-wrap" }}>{profile?.bio}</span>
            )}
          </Grid.Column>
        </Grid>
      </Tab.Pane>
    </div>
  );
}
