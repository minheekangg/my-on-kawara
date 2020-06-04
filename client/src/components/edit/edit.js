import React, { useEffect } from "react";
import { useParams } from "react-router";

import { Loader, Segment } from 'semantic-ui-react';
import styled from "styled-components";

import UpdateTrip from "./trip";
import UpdatePhoto from "./photo";
import Articles from '../articles';
import UpdateStickers from './stickers';

const StyledFormWrapper = styled.div`
    max-width: 300px;
    margin: auto;
    align-items: center;

    .ui.form{
        width: 100%;
    }
`;

const EditArticle = (props) => {
    let { tripId } = useParams();
    const { fetchArticle, updateProp } = props;

    useEffect(() => {
        if (!!tripId) {
            fetchArticle(tripId);
            updateProp({_id: tripId});
        }
    }, [tripId, fetchArticle, updateProp]);

    if ( props.fetched && !props.trip.trip._id ) {
        return <Articles />
    }

    if (props.fetching) {
        return (
            <Segment>
                <Loader active />
            </Segment>
        )
    }

    return(
        <StyledFormWrapper>
            <UpdateTrip tripId={tripId}/>
            <UpdatePhoto />
            <UpdateStickers />
        </StyledFormWrapper>
    )
};

export default EditArticle;
