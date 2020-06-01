import React, { useEffect } from "react";
import { useParams } from "react-router";

import { Loader, Segment } from 'semantic-ui-react';
import styled from "styled-components";

// import UpdatePhoto from './photo';
import UpdateTrip from "./trip";
// import UpdateDestination from './destination';
import Articles from '../articles';

const StyledFormWrapper = styled.div`
    max-width: 300px;
    margin: auto;
    height: 100vh;
    display: flex;
    align-items: center;

    .ui.form{
        width: 100%;
    }
`;

const EditArticle = (props) => {
    let { articleId } = useParams();
    const { fetchArticle } = props;

    useEffect(() => {
        if (!!articleId) {
            fetchArticle(articleId);
        }
    }, [articleId, fetchArticle]);

    if ( props.fetched && !props.article.article._id ) {
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
            <UpdateTrip />
            {/* <UpdateDestination /> */}
            {/* <UpdatePhoto /> */}
        </StyledFormWrapper>
    )
};

export default EditArticle;