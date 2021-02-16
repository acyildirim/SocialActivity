import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEditActivity: (activity: Activity) => void;
}
export default function ActivityForm({ activity : selectedActivity, closeForm, createOrEditActivity}: Props) {
  //Getting initial state
  const initialState = selectedActivity ?? {
    id:'',
    title:'',
    category:'',
    description:'',
    date:'',
    city:'',
    venue:''
  }

  const [activity, setActivity] = useState(initialState);
  
  // Function to submit form
  function handleSubmit() {
    createOrEditActivity(activity);
  }
  // Tracking if the html input changed
  function handleInputChange(event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
    setActivity({...activity, [name] : value})

  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off' >
        <Form.Input label="Title" placeholder="Title" value={activity.title} name='title' onChange={handleInputChange} />
        <Form.TextArea label="Description" placeholder="Description" value={activity.description} name='description' onChange={handleInputChange} />
        <Form.Input label="Category" placeholder="Category" value={activity.category} name='category' onChange={handleInputChange}/>
        <Form.Input label="Date" placeholder="Date" value={activity.date} name='date' onChange={handleInputChange} />
        <Form.Input label="City" placeholder="City" value={activity.city} name='city' onChange={handleInputChange}/>
        <Form.Input label="Venue" placeholder="Venue" value={activity.venue} name='venue' onChange={handleInputChange} />
        <Button floated="right" positive type="submit" content="Submit"/>
        <Button onClick={closeForm} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
}
