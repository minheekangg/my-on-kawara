import React from "react";
import styled from "styled-components";
import { Controller, Scene } from "react-scrollmagic";
import { Tween, Timeline } from "react-gsap";

const PictureContainerWrapper = styled.div`
    height: 100vh;
    border: 1px solid red;
    background-color: #f2eade;

    .parallax {
        height: 500px;
        position: relative;
        overflow: hidden;
        img {
            width: 100%;
            height: auto;
            position: absolute;
        }
        h2 {
            position: absolute;
            left: 200px;
            text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
                0px -5px 35px rgba(255, 255, 255, 0.3);
        }
    }
`;

const PictureContainer = ({post}) => (
    <PictureContainerWrapper>
        hi
    </PictureContainerWrapper>
);

export default PictureContainer;
