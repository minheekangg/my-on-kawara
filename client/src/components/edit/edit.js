import React, { useEffect } from "react";
import { useParams } from "react-router";

import { Loader, Segment } from 'semantic-ui-react';
import styled from "styled-components";

import UpdateTrip from "./trip";
import Articles from '../articles';

const StyledFormWrapper = styled.div`
    max-width: 300px;
    margin: auto;
    display: flex;
    align-items: center;

    .ui.form{
        width: 100%;
    }
`;

const EditArticle = (props) => {
    let { articleId } = useParams();
    const { fetchArticle, updateProp } = props;

    useEffect(() => {
        if (!!articleId) {
            fetchArticle(articleId);
            updateProp({_id: articleId});
        }
    }, [articleId, fetchArticle, updateProp]);

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
            <UpdateTrip articleId={articleId}/>
            {/* <UpdateDestination /> */}
            {/* <UpdatePhoto /> */}
        </StyledFormWrapper>
    )
};

export default EditArticle;
