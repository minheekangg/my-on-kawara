import React from "react";
import styled from "styled-components";

const PictureContainerWrapper = styled.div`
    display: flex;
    height: 100vh;
    background-color: #f2eade;
`;
const PictureFullBleed = styled.div`
    border: 1px solid;
`;
const PicturesContainer = styled.div`
    border:1px solid white;
`;

const PictureContainer = () => (
    <PictureContainerWrapper>
        <PictureFullBleed
            style={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1524063221847-15c7329095d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80)",
            }}
        ></PictureFullBleed>
        <PicturesContainer></PicturesContainer>
    </PictureContainerWrapper>
);

export default PictureContainer;
