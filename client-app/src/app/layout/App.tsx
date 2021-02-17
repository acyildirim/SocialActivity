import React, { Fragment, useEffect} from "react";
import { Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {

  const {activityStore} = useStore();

  // we use [] to prevent endless loop, it will run only one time
  useEffect(() => {
      activityStore.loadActivities();
  }, [activityStore]);
  
  // Start Loading Indicator before render jsx
  if (activityStore.loadingInitial) return <LoadingComponent content='Loading Page...'/>

  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop : '7em'}} >
        <ActivityDashboard/>
      </Container>
    </Fragment>
  );
}

export default observer(App);
