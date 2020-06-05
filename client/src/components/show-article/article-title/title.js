import React from "react";
import styled from "styled-components";
import moment from "moment";

import Sticker from '../sticker';

const TitleWrapper = styled.div`
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

export default class Title extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dimensions: null,
            stickers: props.trip.stickers || [],
            title: props.trip.title || "",
            startDate: props.trip.startDate || "",
            endDate: props.trip.endDate || "",
        }
    }

    componentDidMount() {
        this.setState({
            dimensions: {
                width: this.container.offsetWidth,
                height: this.container.offsetHeight,
            },
        });
    }
    renderStickers(){
        return this.state.dimensions && this.state.stickers.map(s=> {
            return <Sticker
                key={s}
                img={s.url}
                x={Math.floor(Math.random() * (this.state.dimensions.width - 300))}
                y={Math.floor(Math.random() * (this.state.dimensions.height - 300))}
                maxWidth={100}
                height={30}
            />
        })
    }

    render(){
        return (
            <TitleWrapper>
                <div className="title-container">
                    With love, from
                    <h2>{this.state.title}</h2>
                    {(!!this.state.startDate && !!this.state.endDate) 
                        ? <span style={{textTransform: 'capitalize'}}>
                            {moment(this.state.startDate).format("MMM DD, YYYY") + " - " + 
                            moment(this.state.endDate).format("MMM DD, YYYY")}
                            </span> 
                        : null
                    }
                    
                </div>
                <StickerContainer
                    ref={(el) => {
                        this.container = el;
                    }}
                >
                    {this.renderStickers()}
                </StickerContainer>
            </TitleWrapper>
        );
    }
};