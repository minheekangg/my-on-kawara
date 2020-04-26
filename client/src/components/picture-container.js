import React, { useState } from "react";
import styled from "styled-components";

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
    // border:1px solid white;
    width: 50vw;
    margin: 10px;
`;
const PicturesContainer = styled.div`
   img {
       width: 100px;
       height: 100px;
       margin: 10px;
   }
`;

const PICTURES = [
    "https://images.unsplash.com/photo-1524063221847-15c7329095d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80",
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1607&q=80",
    "https://images.unsplash.com/photo-1542729716-86ee2c2c92ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1542729716-86ee2c2c92ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1542729716-86ee2c2c92ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1542729716-86ee2c2c92ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",

]

const PictureContainer = () => {
    const [currentPictureIdx, setCurrentPictureIdx] = useState(0);

    return <PictureContainerWrapper>
        <PictureFullBleed
            style={{
                backgroundImage: `url(${PICTURES[currentPictureIdx]})`,
            }}
        ></PictureFullBleed>
        <hr style={{margin: 0}} />
        <PostContentContainer>
            <PicturesContainer>
                {PICTURES.map((p, idx)=> {
                    return <img data={idx} onClick={()=>setCurrentPictureIdx(idx)} src={p}/>
                })}
            </PicturesContainer>
            here are some contents of my thoughts about this trip
        </PostContentContainer>
    </PictureContainerWrapper>
};

export default PictureContainer;
