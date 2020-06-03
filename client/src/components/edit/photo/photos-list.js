import React from 'react'

import { Image } from "cloudinary-react";
import styled from "styled-components";
import { Button } from 'semantic-ui-react'

const MY_CLOUD_NAME = process.env.REACT_APP_MY_CLOUD_NAME;

const StyledWrapper = styled.div`
    max-width: 300px;
    margin: auto;
    height: 100vh;
    border:1px solid red;
    display: flex;
    align-items: center;

    .ui.form{
        width: 100%;
    }
`;

const PhotosList  = props => {
    if (!props.photos) {
      return null;
    }
    return(
     <StyledWrapper>
      {props.photos.map((e) => {
              return (
                  <Image
                      key={e}
                      publicId={e}
                      width="100"
                      cloudName={MY_CLOUD_NAME}
                  />
              );
          })}
        <Button basic styled={{width: 100, height: 100}}>Standard</Button>   
    </StyledWrapper>
    )
}    


export default PhotosList;
