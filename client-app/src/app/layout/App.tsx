import React, { Fragment, useEffect, useState } from "react";
import { Container, Header, List } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  // Fetching data from the API
  // Returning List of activities
  const [activities, setActivities] = useState<Activity[]>([]);
  // Catching selected activity to display it
  const[selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  // State for edit mode status to display edit form when we want to edit activity
  const[editMode, setEditMode] = useState(false);
  //Loading Indicator
  const [loading, setLoading] = useState(true);


  // we use [] to prevent endless loop, it will run only one time
  useEffect(() => {
      agent.Activities.list().then((response) => {
        //Create new empty array- modify date without time then push them into empty array.
        let activities : Activity [] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        })
        setActivities(activities);
        setLoading(false);
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
  // Start Loading Indicator before render jsx
  if (loading) return <LoadingComponent content='Loading Page...'/>

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
