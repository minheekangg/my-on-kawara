import React, { useState, useEffect } from "react";
import axios from "axios";

export const App = () => {
  const [articles, setArticles] = useState();

  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/api/articles/"
      )
      .then( res => {
          if (res && res.data && res.data.articles) {
              setArticles(res.data.articles);
          }
      })
      .catch(err=>console.log('error', err));
  }, []);

  return articles ? (
      <div>
          {articles.map(article => {
              return <div>{article.title}</div>
          })}
      </div>
  ) : (
      <div>nothing yet</div>
  )
};

export default App;