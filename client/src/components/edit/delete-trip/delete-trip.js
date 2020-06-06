import React, {useState} from "react";
import {
    withRouter
} from 'react-router-dom'
import styled from "styled-components";
import { Button, Modal } from "semantic-ui-react";


const StyledWrapper = styled.div`
  max-width: 300px;
  margin: 50px auto;

  button {width: 100%}
`;


const DeleteTrip = (props) => {
    const [open, changeOpen] = useState(false);

    const handleDelete = (e) => {
        e.preventDefault();
        props.deleteTrip(props.tripId);
        props.history.push('/articles')
    }

    return (<StyledWrapper>
        <Modal open={open} trigger={<Button onClick={()=>changeOpen(true)}>Delete Trip</Button>}>
            <Modal.Header>Delete This Trip</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete this trip?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => changeOpen(false)} >Close</Button>
                <Button
                    negative
                    icon='trash'
                    labelPosition='right'
                    content='Delete'
                    onClick={e=>handleDelete(e)}
                />
            </Modal.Actions>
        </Modal>
    </StyledWrapper>
)}

export default withRouter(DeleteTrip);
