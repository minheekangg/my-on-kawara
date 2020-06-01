import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Loader, Segment } from 'semantic-ui-react';

import ArticleTitle from './article-title';
import ArticlePictures from './article-pictures';

const ShowArticle = (props) => {
    let { articleId } = useParams();
    const { fetchArticle } = props;

    useEffect(() => {
        if (!!articleId) {
            fetchArticle(articleId);
        }
    }, [articleId, fetchArticle]);

    if (props.fetching) {
        return (
            <Segment>
                <Loader active />
            </Segment>
        )
    }


    return !!props.article 
        ? <div>
            <ArticleTitle  />
            <ArticlePictures  />
        </div>
        : <div>nothing in single article</div>
};

export default ShowArticle;