import React, { useState, useEffect } from "react";
import axios from "axios";

import PostTitle from './post-title';
import PictureContainer from './picture-container';

const Articles = () => {
    const [articles, setArticles] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/trips", {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((res) => {
                if (
                    res &&
                    res.data &&
                    res.data.trip &&
                    !!res.data.trip.length
                ) {
                    console.log(res.data.trip);
                    setArticles(res.data.trip);
                }
            })
            .catch((err) => console.log("error", err));
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
