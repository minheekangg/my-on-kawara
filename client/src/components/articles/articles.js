import React, { useEffect } from "react";

import PostTitle from '../show-article/post-title';
import PictureContainer from '../show-article/picture-container';

const Articles = (props) => {
    const { fetchArticles } = props;
    const { articles } = props;

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    return props.articles && !!props.articles.length ? (
        <div>
            <PostTitle article={articles[articles.length -1]} />
            <PictureContainer article={articles[articles.length -1]} />
        </div>
    ) : (
        <div>nothing yet</div>
    );
};

export default Articles;
