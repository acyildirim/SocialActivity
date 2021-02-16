import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';

function App() {
  // Fetching data from the API
  // Returning List of activities
  const [activities, setActivities] = useState<Activity[]>([]);
  // Catching selected activity to display it
  const[selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  // State for edit mode status to display edit form when we want to edit activity
  const[editMode, setEditMode] = useState(false);

  // we use [] to prevent endless loop, it will run only one time
  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  //Function to find selected activity
  function handleSelectActivity(id : string){
    setSelectedActivity(activities.find(x => x.id === id));
  }
  //Function to cancel selected activity
  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }
  //Function to open form
  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  //Function to close form
  function handleFormClose(){
    setEditMode(false);
  }
  // Create Or Edit Activity
  function handleCreateOrEditActivity(activity : Activity) {
    activity.id 
    ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id : string){
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop : '7em'}} >
        <ActivityDashboard 
        activities= {activities} 
        selectedActivity = {selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEditActivity={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
