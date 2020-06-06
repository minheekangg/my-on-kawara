import React, {useState} from 'react';

import styled from "styled-components";
import { Button, Modal, Image, Loader } from 'semantic-ui-react';

import CreatePhoto from "./create-photo";

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

const StyledImage = styled.img`
    width: 100px;
    height: 100px;
`;




const PhotosList = props => {
  const [creating, changeCreating] = useState(false);

  if (props.updated) {
    return window.location.reload();
  }

  if (props.updating && !props.updated) {
    return < Loader />
  }

    return(
     <StyledWrapper>
       <PhotosContainer>
        <StyledSemanticLabel>Images: </StyledSemanticLabel>
          {props.photos.map((p, idx) => {
            return (
              <Modal key={p._id + idx} trigger={< StyledImage  src={p.src} alt={p.city + p.date} />} closeIcon>
                <Modal.Content image>
                  <Image wrapped size='medium' src={p.src} />
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
            )
            })}
          <StyledButton onClick={()=>changeCreating(true)}>+</StyledButton>   
       </PhotosContainer>
        {creating && <CreatePhoto />}
    </StyledWrapper>
    )
}    


export default PhotosList;
