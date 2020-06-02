import React, { useEffect } from "react";
import styled from "styled-components";

import moment from "moment";

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
    const { fetchArticles, articles } = props;
    const link = !!props.toEdit ? 'edit' : 'articles';
    console.log('link is', link)

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    return props.articles && !!props.articles.length ? (
        <StyledWrapper>
            <StyledArticlesWrapper>
                <h2>Travel</h2>
            {articles.map(e=>{
                const formattedDates = `${moment(e.startDate).format("MM/DD/YYYY")} - ${moment(e.endDate).format("MM/DD/YYYY")}`
                return <ArticleWrapper key={e._id} onClick={()=>props.history.push(`${link}/${e._id}`)}>
                    <div>{e.title}</div>
                    <div>{formattedDates}</div>
                </ArticleWrapper>
            })}
            </StyledArticlesWrapper>
        </StyledWrapper>
    ) : (
        <div>nothing yet</div>
    );
};

export default Articles;
