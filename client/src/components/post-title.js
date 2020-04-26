import React from "react";
import styled from "styled-components";

import Moment from "react-moment";
import "moment-timezone";

import Sticker from './sticker';

const PostTitleWrapper = styled.div`
    height: calc(100vh - 20px);
    background-color: #f2eade;
    position: relative;
    margin: 10px;
    overflow: hidden;
    
    .title-container {
        position: absolute;
        margin: auto;
        background-color: #f2eade;
        width: 300px;
        border: 1px solid;
        margin: 10px;
        bottom: 10%;
        right: 0%;
        padding: 30px;
        z-index: 3;
        text-align: center;
    }
`;

const StickerContainer = styled.div`
    position: relative;
    overflow: hidden;
    height: 100vh;
`;

const STICKERS = [
    "https://images.unsplash.com/photo-1567748534085-467f8a8a475d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=582&q=80",
    "https://images.unsplash.com/photo-1520010017217-db8870fd542f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
    "https://images.unsplash.com/photo-1524850301259-7729d41d11d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1026&q=80"
]

export default class PostTitle extends React.Component {
    state = {
        dimensions: null,
    };
    componentDidMount() {
        this.setState({
            dimensions: {
                width: this.container.offsetWidth,
                height: this.container.offsetHeight,
            },
        });
    }
    renderStickers(){
        return this.state.dimensions && STICKERS.map(s=> {
            return <Sticker
                key={s}
                img={s}
                x={Math.floor(Math.random() * (this.state.dimensions.width - 300))}
                y={Math.floor(Math.random() * (this.state.dimensions.height - 300))}
                width={100}
                height={30}
            />
        })
    }

    render(){
        return (
            <PostTitleWrapper>
                <div className="title-container">
                    With love, from
                    <h2>Paris, Amsterdam, London</h2>
                    <Moment>April 08, 2018 - April 14, 2018</Moment>
                </div>
                <StickerContainer
                    ref={(el) => {
                        this.container = el;
                    }}
                >
                    {this.renderStickers()}
                </StickerContainer>
            </PostTitleWrapper>
        );
    }
};