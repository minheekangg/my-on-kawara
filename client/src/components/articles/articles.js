import React, { useEffect } from "react";

import PostTitle from '../post-title';
import PictureContainer from '../picture-container';

const Articles = (props) => {
    const { fetchArticles } = props;
    const { articles } = props;
    // const [ articles, setArticles ] = useState();

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    console.log(props);
    return props.articles && !!props.articles.length ? (
        <div>
            <PostTitle article={articles[0]}/>
            <PictureContainer article={articles[0]}/>
        </div>
    ) : (
            <div>nothing yet</div>
        )
};

export default Articles;
