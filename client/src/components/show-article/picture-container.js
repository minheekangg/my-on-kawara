import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment"

const PictureContainerWrapper = styled.div`
    display: flex;
    height: calc(100vh - 20px);
    margin: 10px;
    overflow: hidden;
`;
const PictureFullBleed = styled.div`
    // border: 1px solid;
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

const PICTURES = [{
    src: "https://images.unsplash.com/photo-1524063221847-15c7329095d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80",
    date: new Date(),
    people: ['minhee', 'jonah'],
    location: 'https://goo.gl/maps/to5RLscS7XbVqeT18',
    description: 'paris'
}, {
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
    date: new Date(),
    people: ['minhee', 'jonah'],
    location: 'url here?',
    description: 'paris',
}, {
    src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1607&q=80",
    date: new Date(),
    people: ['minhee', 'jonah'],
    description: 'paris'
}, {
    src: "https://images.unsplash.com/photo-1542729716-86ee2c2c92ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    date: new Date(),
    people: ['minhee', 'jonah'],
    description: 'paris'
}]

const PictureContainer = ({article}) => {
    const [currentPictureIdx, setCurrentPictureIdx] = useState(0);
    const [expandText, setExpandText] = useState(false);
    return <PictureContainerWrapper>
        <PictureFullBleed
            style={{
                backgroundImage: `url(${PICTURES[currentPictureIdx].src})`,
            }}
        ></PictureFullBleed>
        <hr style={{margin: 0}} />
        <PostContentContainer>
            <PicturesContainer>
                {PICTURES.map((p, idx)=> {
                    return <img key={p.description + idx} onClick={()=>setCurrentPictureIdx(idx)} src={p.src} alt={p.description}/>
                })}
            </PicturesContainer>
            <PictureDescription>
                <timestamp>{moment(PICTURES[currentPictureIdx].date).format('MMMM Do YYYY')}</timestamp>
                <span> {PICTURES[currentPictureIdx].people.join(", ")} </span>
                { !!PICTURES[currentPictureIdx].location && <span><a target="_blank" rel="noopener noreferrer" href={PICTURES[currentPictureIdx].location}>location</a> </span>}
                { !!PICTURES[currentPictureIdx].description && <span>{PICTURES[currentPictureIdx].description}</span>}
            </PictureDescription>
            <AdditionalContent onClick={() => setExpandText(!expandText)} className={expandText ? 'active' : 'not-active'}> {!!article.content && article.content}
            </AdditionalContent>
        </PostContentContainer>
    </PictureContainerWrapper>
};

export default PictureContainer;
