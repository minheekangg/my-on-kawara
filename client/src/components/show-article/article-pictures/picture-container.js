import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import moment from "moment"
import { Image, Transformation } from "cloudinary-react";
import { Icon } from 'semantic-ui-react'


const MY_CLOUD_NAME = process.env.REACT_APP_MY_CLOUD_NAME;
const mobileBP = '600px';

const PictureContainerWrapper = styled.div`
    display: flex;
    height: calc(100vh - 20px);
    padding: 10px;
    overflow: hidden;
    position: relative;
    background-color: white;
`;
const PictureFullBleed = styled.div`
    width: 50vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin: 10px;

    @media screen and (max-width: ${mobileBP}) {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        margin: 0;
        background-color: white;
        padding: 10px;
        z-index: -1;

        &.active{
            z-index: 3;
        }
    }
`;
const PostContentContainer = styled.div`
    width: 50vw;
    margin: 10px;
    overflow: hidden;
    position: relative;

    @media screen and (max-width: ${mobileBP}) {
        width: 100%;
        height: 100%;
        background-color: white;
        margin: 0;
    }
`;
const PicturesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-height: calc(100% - 30px);
    overflow-y: scroll;

    img {
        margin: 10px;
        cursor: pointer;
    }

    @media screen and (max-width: 800px) {
        margin: auto -10px;

       img {
           margin: 5px;
           width: 80px;
           height: 80px;
       }
    }

    @media screen and (max-width: ${mobileBP}) {
        margin: auto -10px;
        align-items: flex-start;
        height: auto;

       img {
           margin: 5px;
       }
    }
`;

const PictureDescription = styled.div`
    bottom: 0;
    position: absolute;
    color: red;
    text-transform: uppercase;

    a { 
        color: inherit;
    }
`;

const TripDescription = styled.div`
    bottom: 0;
    position: absolute;
    width: 100%;
    background-color: white;

    cursor:pointer;
    white-space: pre-line;
    padding: 10px;
    height: auto;
    max-height: 30px;
    transition: all 0.5s ease-in;

    &.active {
        max-height: 100%;
        overflow-y: scroll;
    }

    &.active>div {
        max-height: 100vh;
    }
    &.not-active>div {
        max-height: 0;
    }
`;
    
const AdditionalContent = styled.div`
    font-size: 14px;
    padding: 10px;
    border-top: 1px solid;
    height: 100%;
    max-height: 0;
    transition: all 0.5s ease-in;
`;


const PictureContainer = ({trip}) => {
    const [expandText, setExpandText] = useState(false);
    const [currentPicture, setCurrentPicture] = useState({});
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        if (!!trip.photos) {
            setCurrentPicture(trip.photos[0])
        }

    }, [setCurrentPicture, trip.photos])
    

    const renderDescription = () => {
        const desc = [];

        if (!!currentPicture.date) {
            desc.push(<span>{moment(currentPicture.date).format('\'YY/MM/DD')}</span>)
        } 
        
        
        if (!!currentPicture.city) {
            desc.push(<span> {currentPicture.city} </span>)
        }

        if (!!currentPicture.location) {
            desc.push(<span> <a target="_blank" rel="noopener noreferrer" href={currentPicture.location}><Icon link name='map marker' /></a></span>)
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

    const handleClick=(picture)=> {
        setCurrentPicture(picture);
        setShowImage(true);
    }

    
    return <PictureContainerWrapper>
        <PictureFullBleed className={showImage && "active"} onClick={()=>setShowImage(false)}
            style={{
                backgroundImage: `url(http://res.cloudinary.com/${MY_CLOUD_NAME}/image/upload/v1/${currentPicture.publicId}.jpg)`
            }}
        >
        {renderDescription()}
        </PictureFullBleed>
        <hr style={{margin: 0}} />
        <PostContentContainer>
            <PicturesContainer>
                {trip.photos.map((p, idx)=> {
                    return (
                        <Image format="jpg" crop="fit" key={p._id + idx} onClick={() => handleClick(p)} publicId={p.publicId} alt={p.city + p.date} cloudName={MY_CLOUD_NAME}><Transformation width="100" height="100" crop="fill" /></Image>
                    )
                })}
            </PicturesContainer>
            <TripDescription onClick={() => setExpandText(!expandText)} className={expandText ? 'active' : 'not-active'}>
                {expandText ? 'Less' : 'More'}
                {!!trip.content && trip.content
                    ? <AdditionalContent > {trip.content}
                    </AdditionalContent>
                    : null
                }
            </TripDescription>
        </PostContentContainer>
    </PictureContainerWrapper>
};

export default PictureContainer;
