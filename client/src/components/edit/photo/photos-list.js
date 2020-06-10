import React, {useState} from 'react';
import moment from "moment";

import styled from "styled-components";
import { Button, Modal, Loader, Form, Dropdown, Input } from 'semantic-ui-react';
import { Image } from "cloudinary-react";

import CreatePhoto from "./create-photo";
const MY_CLOUD_NAME = process.env.REACT_APP_MY_CLOUD_NAME;

const StyledWrapper = styled.div`
  max-width: 300px;
  margin: 50px auto;
  min-height: 100vh;  
`;
  
const PhotosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;    
`;
      
const StyledSemanticLabel = styled.label`
  display: block;
  margin: 0 0 .28571429rem 0;
  color: rgba(0,0,0,.87);
  font-size: .92857143em;
  font-weight: 700;
  text-transform: none;
  width: 100%;
`;
    
const StyledButton = styled(Button)`
  &.ui.button {
    height: 100px;
    width: 100px;
    margin: 0;
    border-radius: 0;
  }
`;


const PhotosList = props => {
  const [creating, changeCreating] = useState(false);
  const [photo, setPhoto] = useState({
      _id: "",
      date: "",
      location: "",
      destination: ""
  })

  if (props.updated) {
    return window.location.reload();
  }

  if (props.updating && !props.updated) {
    return < Loader />
  }

  const handleChange = (value, key, photoId) => {
    setPhoto({
        ...photo,
        [key]: value,
        _id: photoId
    })
    return;
  }

  const formatDates = (startDate, endDate) => {
    const dates = calculateDays(startDate, endDate)

    return dates.map(d => {
      return {
        key: d,
        text: d,
        value: d,
      };
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updatePhotos(photo);
    return;
  }

  const formatDestinations = (destinations) => {
    if (!destinations || destinations.length <= 0) {
      return [];
    }

    return destinations.map((d) => {
      return {
        key: d.city,
        text: d.city,
        value: d._id,
      };
    });
  }
  console.log(photo)
    return(
     <StyledWrapper>
       <PhotosContainer>
        <StyledSemanticLabel>Images: </StyledSemanticLabel>
          {props.photos.map((p, idx) => {
            return <Modal key={p._id} trigger={< Image format="jpg" width="100" height="100" crop="fill" cloudName={MY_CLOUD_NAME} publicId={p.publicId} alt={p.city + p.date} />} closeIcon>
                <Modal.Content image>
                  <Image
                    key={p.publicId}
                    publicId={p.publicId}
                    width="300"
                    cloudName={MY_CLOUD_NAME}
                    format='jpg'
                    alt={p.city + p.date} 
                  />
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <label>
                      Current Destination: {p.city}
                      <Dropdown
                            placeholder="Destination"
                            name="destination"
                            selection
                            required
                            fluid
                            options={formatDestinations(props.destinations)}
                            onChange={(e, { value }) =>
                              handleChange(value, "destination", p._id)
                            }
                      />
                    </label>
                    <label>
                        Current Date: {p.date}
                        <Dropdown
                          placeholder="Date"
                          name="date"
                          selection
                          fluid
                          options={formatDates(props.startDate, props.endDate)}
                          onChange={(e, { value }) =>
                            handleChange(value, "date", p._id)
                          }
                        />
                      </label>
                  <Form.Field
                    control={Input}
                    label="Location"
                    name="location"
                    fluid
                    value={photo.location || p.location}
                    onChange={(e, { value }) =>
                      handleChange(value, "location", p._id)
                    }
                  />
                  <Form.Button>Submit</Form.Button>
                </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                      negative
                      icon='trash'
                      labelPosition='right'
                      content='Delete'
                      onClick={()=>{
                        props.deletePhoto(p._id, props.tripId)
                      }}
                    />
                </Modal.Actions>
              </Modal>
            })}
          <StyledButton onClick={()=>changeCreating(true)}>+</StyledButton>   
       </PhotosContainer>
        {creating && <CreatePhoto />}
    </StyledWrapper>
    )
}    


export default PhotosList;

const calculateDays = (start, end) => {
  var dates = [];

  var currDate = moment(start).startOf('day');
  var lastDate = moment(end).startOf('day');
  dates.push(currDate.clone().utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format("MM/DD/YYYY"))


  while (currDate.add(1, 'days').diff(lastDate) <= 1) {
    dates.push(currDate.clone().utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format("MM/DD/YYYY"));
  }

  return dates;
}
