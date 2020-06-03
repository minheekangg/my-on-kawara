import React, {useState} from 'react';

import styled from "styled-components";
import { Button } from 'semantic-ui-react'

const StyledWrapper = styled.div`
    max-width: 300px;
    margin: 50px auto;
    // height: 100vh;
    border:1px solid red;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    label {
      display: block;
      margin: 0 0 .28571429rem 0;
      color: rgba(0,0,0,.87);
      font-size: .92857143em;
      font-weight: 700;
      text-transform: none;
      width: 100%;
    }
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

    const addNew = e => {
      console.log(e)
    }
    if (!props.photos) {
      return null;
    }
    return(
     <StyledWrapper>
       <label>Images: </label>
      {props.photos.map((p, idx) => {
          return < StyledImage key = { p._id + idx } src={p.src} alt={p.city + p.date}/>
          })}
        <StyledButton onClick={addNew}>+</StyledButton>   
    </StyledWrapper>
    )
}    


export default PhotosList;
