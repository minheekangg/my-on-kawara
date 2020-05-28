import React, { useEffect } from "react";

import PostTitle from './post-title';
import PictureContainer from './picture-container';
import { useParams } from "react-router-dom";

const ShowArticle = (props) => {
    let { articleId } = useParams();
    const { fetchArticle } = props;
    // const { articles } = props;

    useEffect(() => {
        if (!!articleId) {
            fetchArticle(articleId);
        }
    }, [fetchArticle]);

    // return props.articles && !!props.articles.length ? (
    //     <div>
    //         <PostTitle article={articles[articles.length -1]} />
    //         <PictureContainer article={articles[articles.length -1]} />
    //     </div>
    // ) : (
    return (
        <div>nothing in single article</div>
    );
};

export default ShowArticle;
