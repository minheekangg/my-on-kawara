import React from "react";
import styled from "styled-components";

import Sticker from './sticker';

const PostTitleWrapper = styled.div`
    height: 100vh;
    background-color: #f2eade;
    position: relative;
    overflow: hidden;
    
    .title-container {
        position: absolute;
        margin: auto;
        background-color: #f2eade;
        width: 300px;
        height: 100px;
        left: calc(50% - 150px - 25px);
        top: calc(50% - 50px - 25px);
        padding: 50px;
        z-index: 3;
        text-align: center;
    }
`;

export default class PostTitle extends React.Component {
    render(){
        return (
            <PostTitleWrapper>
                <div className="title-container">
                    <h2>Paris, Amsterdam, London</h2>
                    <datetime>April 08, 2018 - April 14, 2018</datetime>
                </div>
                <Sticker
                    img={
                        "https://images.unsplash.com/photo-1567748534085-467f8a8a475d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=582&q=80"
                    }
                    x={520}
                    y={-50}
                    width={100}
                    height={30}
                />
                <Sticker
                    img={
                        "https://images.unsplash.com/photo-1520010017217-db8870fd542f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
                    }
                    x={350}
                    y={300}
                />
                <Sticker
                    img={
                        "https://images.unsplash.com/photo-1524850301259-7729d41d11d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1026&q=80"
                    }
                    x={760}
                    y={130}
                />
            </PostTitleWrapper>
        );
    }
};