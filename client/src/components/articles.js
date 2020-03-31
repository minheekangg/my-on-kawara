import React, { useState, useEffect } from "react";
import axios from "axios";

const searchTerm = 'paris';
const upsplash_id = process.env.REACT_APP_UPSPLASH_ACCESS_KEY.replace("'", "");

const Articles = () => {
    const [articles, setArticles] = useState();

    useEffect(() => {
        axios
            .get(`https://api.unsplash.com/search/photos`, {
                params: { query: searchTerm },
                headers: {
                    Authorization:
                        `Client-ID ${upsplash_id}`
                }
            })
            .then(res => {
                if (res && res.data && res.data.results && !!res.data.results.length) {
                    console.log(res.data.results);
                    setArticles(res.data.results);
                }
            })
            //   .then( res => {
            //       if (res && res.data && res.data.articles) {
            //           setArticles(res.data.articles);
            //       }
            //   })
            .catch(err => console.log("error", err));
    }, []);

    return articles ? (
        <div>
            {articles.map(article => {
                return <img src={article.urls.small} key={article.id} alt={article.alt_description} />
            })}
        </div>
    ) : (
            <div>nothing yet</div>
        )
};

export default Articles;
