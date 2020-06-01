import React, { useEffect } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
    max-width: 300px;
    margin: auto;
    height: 100vh;
    display: flex;
    align-items: center;
`;
    
const StyledArticlesWrapper = styled.div`
    display: flex;
    border: 1px solid;
    flex-direction: column;
    padding: 10px;
    width: 100%;

    h2 {
        border-bottom: 1px dotted;
    }

`;
    
const ArticleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    // border: 1px solid blue;
    min-width: 100%;
    margin: 10px 0;
    cursor: pointer;

    &:hover {
        color: red;
    }
`;


const Articles = (props) => {
    const { fetchArticles } = props;
    const { articles } = props;

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    return props.articles && !!props.articles.length ? (
        <StyledWrapper>
            <StyledArticlesWrapper>
                <h2>Travel</h2>
            {articles.map(e=>{
                return <ArticleWrapper onClick={()=>props.history.push(`articles/${e._id}`)}>
                    <div>{e.title}</div>
                    <div>{e.startDate} - {e.endDate}</div>
                </ArticleWrapper>
            })}
            </StyledArticlesWrapper>
        </StyledWrapper>
    ) : (
        <div>nothing yet</div>
    );
};

export default Articles;
