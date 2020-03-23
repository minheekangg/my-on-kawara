import React, { useState, useEffect } from "react";
import axios from "axios";

export const App = () => {
  const [articles, setArticles] = useState();
//   const [nextTodoId, setNextTodoId] = useState(0);
//   const [newTodoLabel, setNewTodoLabel] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/api/articles/"
      )
      .then( ({articles})=> {
          console.log(articles);
        setArticles(articles);
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