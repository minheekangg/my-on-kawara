import React from 'react';

import styled from "styled-components";
import { Button, Modal, Loader } from 'semantic-ui-react';
import { Image } from "cloudinary-react";

import CreateSticker from "./create-sticker";

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

  if (props.updated) {
    return window.location.reload();
  }

  if (props.updating && !props.updated) {
    return < Loader />
  }

    return(
     <StyledWrapper>
       <PhotosContainer>
        <StyledSemanticLabel>Stickers: </StyledSemanticLabel>
          {props.photos.map((p, idx) => {
            return <Modal trigger={< Image format="jpg" width="100" height="100" crop="fill" cloudName={MY_CLOUD_NAME} key={p._id + idx} src={p.url} alt={p.city + p.date} />} closeIcon>
                  <Modal.Content image>
                    <Image
                      key={p.publicId}
                      publicId={p.publicId}
                      width="300"
                      cloudName={MY_CLOUD_NAME}
                      format='jpg'
                    />
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      negative
                      icon='trash'
                      labelPosition='right'
                      content='Delete'
                      onClick={() => {
                        props.deleteSticker(p._id, props.tripId)
                      }}
                    />
                  </Modal.Actions>
                </Modal>
            }
            )}
          <StyledButton onClick={() => props.setCreateSticker()}>+</StyledButton>   
       </PhotosContainer>
       {props.isCreating && <CreateSticker />}
    </StyledWrapper>
    )
}    


export default PhotosList;
