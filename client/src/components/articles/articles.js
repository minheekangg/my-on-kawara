import React, { useState, useEffect } from "react";

import PostTitle from '../post-title';
import PictureContainer from '../picture-container';

const Articles = (props) => {
    const { fetchArticles } = props;
    const [articles, setArticles] = useState();

    useEffect(() => {
       fetchArticles();
    }, []);

    return articles ? (
        <div>
            <PostTitle article={articles[0]}/>
            <PictureContainer article={articles[0]}/>
        </div>
    ) : (
            <div>nothing yet</div>
        )
};

export default Articles;
