import React from "react";
import styled from "styled-components";

import Sticker from './sticker';

const stickers = [
    { img: 'https://www.teachok.com/logo.svg', x: 0, y: 0 },
    { img: 'https://www.teachok.com/logo-dark.svg', x: 220, y: 220 },
];

const PostTitleWrapper = styled.div`
    height: 100vh;
    background-color: #f2eade;
    position: relative;
    
    .title-container {
        position: absolute;
        margin: auto;
        border: 1px solid red;
        background-color: #f2eade;
        width: 100px;
        left: calc(50% - 100px);
        top: calc(50% - 50px);
        padding: 50px;
        z-index: 3;
    }
`;

export default class PostTitle extends React.Component {
    render(){
        return (
            <PostTitleWrapper>
                <div className="title-container">hi</div>
                <Sticker
                    img={
                        "https://images.unsplash.com/photo-1567748534085-467f8a8a475d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=582&q=80"
                    }
                    x={100}
                    y={0}
                />
            </PostTitleWrapper>
        );
    }
};