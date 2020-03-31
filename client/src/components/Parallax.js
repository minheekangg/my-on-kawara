import React from "react";
import styled from "styled-components";
import { Controller, Scene } from "react-scrollmagic";
import { Tween, Timeline } from "react-gsap";

const ParallaxStyled = styled.div`
    .section {
        height: 40vh;
    }
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

const Parallax = ({post}) => (
    console.log('props are', post),
    <ParallaxStyled>
        <Controller>
            <div className="section" />
            <Scene indicators={true} duration="200%" triggerHook="onEnter">
                <Timeline wrapper={<div className="parallax" />}>
                    <Tween
                        position="0"
                        from={{
                            yPercent: -50
                        }}
                        to={{
                            yPercent: 0
                        }}
                        offset={1000}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
                            alt=""
                        />
                    </Tween>
                    <Tween
                        position="0"
                        from={{
                            top: "0%",
                            scale: 1.5
                        }}
                        to={{
                            top: "70%",
                            scale: 2
                        }}
                    >
                        <h2>{post.title || "Paris"}</h2>
                    </Tween>
                </Timeline>
            </Scene>
            <div className="section" />
        </Controller>
    </ParallaxStyled>
);

export default Parallax;
