import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import moment from "moment"

const PictureContainerWrapper = styled.div`
    display: flex;
    height: calc(100vh - 20px);
    margin: 10px;
    overflow: hidden;
`;
const PictureFullBleed = styled.div`
    width: 50vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin: 10px;
`;
const PostContentContainer = styled.div`
    width: 50vw;
    margin: 10px;
    overflow: hidden;
`;
const PicturesContainer = styled.div`
    height: 80vh;
    
    img {
        width: 100px;
        height: 100px;
        margin: 10px;
        cursor: pointer;
    }
`;

const PictureDescription = styled.div`
    padding: 30px 15px 0;
`;

const AdditionalContent = styled.div`
    margin: 10px;
    font-size: 14px;
    border-top: 1px solid;
    height: 100%;
    background-color: white;
    padding: 10px;
    transition: all 0.5s;
    cursor:pointer;

    &.active {
        transform: translateY(-80vh);
    }
    &.not-active {
        
    }
`;


const PictureContainer = ({trip}) => {
    const [expandText, setExpandText] = useState(false);
    const [currentPicture, setCurrentPicture] = useState({})

    useEffect(() => {
        if (!!trip.photos) {
            setCurrentPicture(trip.photos[0])
        }

    }, [setCurrentPicture, trip.photos])
    

    const renderDescription = () => {
        const desc = [];

        if (!!currentPicture.date) {
            desc.push(<span>{moment(currentPicture.date).format('MM/DD/YYYY')}</span>)
        } 

        if (!!currentPicture.people) {
            if (currentPicture.people.length === 1) {
                desc.push(<span> {currentPicture.people[0].name} </span>)
            } else {
                const peopleNames = currentPicture.people.map(e => e.name)
                desc.push(<span> {peopleNames.join(", ")} </span>)
            }
        } 
        
        if (!!currentPicture.location) {
            desc.push(<span><a target="_blank" rel="noopener noreferrer" href={currentPicture.location}>location</a> </span>)
        }

        if (!!currentPicture.city) {
            desc.push(<span>{currentPicture.city}</span>)
        }

        return (
            <PictureDescription>
                {desc.map((e, idx)=> <Fragment key={idx}>{e}</Fragment>)}
            </PictureDescription>
        )
    }

    if (!trip.photos || trip.photos.length < 1) {
        return null;
    } 

    
    return <PictureContainerWrapper>
        <PictureFullBleed
            style={{
                backgroundImage: `url(${currentPicture.src})`,
            }}
        ></PictureFullBleed>
        <hr style={{margin: 0}} />
        <PostContentContainer>
            <PicturesContainer>
                {trip.photos.map((p, idx)=> {
                    return <img key={p._id+idx} onClick={() => setCurrentPicture(p)} src={p.src} alt={p.city + p.date}/>
                })}
            </PicturesContainer>
            {renderDescription()}
            {!!trip.content && trip.content 
                ? <AdditionalContent onClick={() => setExpandText(!expandText)} className={expandText ? 'active' : 'not-active'}> { trip.content }
                </AdditionalContent>
                : null
            }
        </PostContentContainer>
    </PictureContainerWrapper>
};

export default PictureContainer;
