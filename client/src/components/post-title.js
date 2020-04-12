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
        // border: 1px solid red;
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
                    width={100}
                    height={30}
                />
                <Sticker
                    img={
                        "https://images.unsplash.com/photo-1520010017217-db8870fd542f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
                    }
                    x={550}
                    y={100}
                />
                <Sticker
                    img={
                        "https://images.unsplash.com/photo-1524850301259-7729d41d11d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1026&q=80"
                    }
                    x={700}
                    y={400}
                />
            </PostTitleWrapper>
        );
    }
};