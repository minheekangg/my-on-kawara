import React from "react";
import styled from "styled-components";
import moment from "moment";

import Sticker from '../sticker';

const TitleWrapper = styled.div`
    height: calc(100vh - 20px);
    // background-color: #f2eade;
    position: relative;
    margin: 10px;
    overflow: hidden;
    
    .title-container {
        position: absolute;
        margin: auto;
        background-color: white;
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
            people: props.trip.people || []
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
                key={s._id}
                img={s.url}
                x={Math.floor(Math.random() * (this.state.dimensions.width - 300))}
                y={Math.floor(Math.random() * (this.state.dimensions.height - 300))}
                width={s.size && s.size === 'large' ? 300 : 150}
                height={50}
            />
        })
    }

    renderPeople = people => {
        if (people.length === 1) {
            return <div>{people[0].name}</div>
        } 
        const peopleNames = people.map(e => e.name)
        return <div> {peopleNames.join(", ")}</div>
    }

    render(){
        const {title, startDate, endDate, people} = this.state;
        return (
            <TitleWrapper>
                <div className="title-container">
                    <h2>{title}</h2>
                    {(!!startDate && !!endDate) 
                        ? <span style={{textTransform: 'capitalize'}}>
                            {moment(startDate).format("MMM DD, YYYY") + " - " + 
                            moment(endDate).format("MMM DD, YYYY")}
                            </span> 
                        : null
                    }
                    { people && people.length > 0 && this.renderPeople(people)}
                    
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