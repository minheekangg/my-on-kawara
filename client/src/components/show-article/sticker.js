import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
    cursor: move;
    width: ${(props) => props.width || 200}px;
    transform: translate(
        ${(props) => props.x || 0}px,
        ${(props) => props.y || 0}px
    );
    transition: transform 0.3s ease-in-out;
    background-image: url(${(props) => props.img});
    padding-top: ${(props) => props.height || 40}%;
    background-position: center top;
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;

    ${({ isDragging }) =>
        isDragging &&
        css`
            opacity: 0.8;
            cursor: grabbing;
        `};
`;

export default class Sticker extends React.Component {
    state = {
        isDragging: false,

        originalX: 0,
        originalY: 0,

        translateX: 0,
        translateY: 0,

        lastTranslateX: 0,
        lastTranslateY: 0,
    };

    componentWillUnmount() {
        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("touchmove", this.handleMouseMove);
        window.removeEventListener("mouseup", this.handleMouseUp);
    }

    handleMouseDown = ({ clientX, clientY }) => {
        window.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("mouseup", this.handleMouseUp);
        window.removeEventListener("touchmove", this.handleMouseMove);


        if (this.props.onDragStart) {
            this.props.onDragStart();
        }

        this.setState({
            originalX: clientX,
            originalY: clientY,
            isDragging: true,
        });
    };

    handleMouseMove = ({ clientX, clientY }) => {
        const { isDragging } = this.state;
        const { onDrag } = this.props;

        if (!isDragging) {
            return;
        }

        this.setState(
            (prevState) => ({
                translateX:
                    clientX - prevState.originalX + prevState.lastTranslateX,
                translateY:
                    clientY - prevState.originalY + prevState.lastTranslateY,
            }),
            () => {
                if (onDrag) {
                    onDrag({
                        translateX: this.state.translateX,
                        translateY: this.state.translateY,
                    });
                }
            }
        );
    };

    handleMouseUp = () => {
        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("mouseup", this.handleMouseUp); 
        window.removeEventListener("touchmove", this.handleMouseMove);


        this.setState(
            {
                originalX: 0,
                originalY: 0,
                lastTranslateX: this.state.translateX,
                lastTranslateY: this.state.translateY,

                isDragging: false,
            },
            () => {
                if (this.props.onDragEnd) {
                    this.props.onDragEnd();
                }
            }
        );
    };

    render() {
        const { children, x, y, width, height } = this.props;
        const { translateX, translateY, isDragging } = this.state;

        return (
            <Container
                onMouseDown={this.handleMouseDown}
                x={translateX}
                y={translateY}
                isDragging={isDragging}
                img={this.props.img}
                style={{left: x, top: y}}
                width={width}
                height={height}
            >
                {children}
                </Container>
        );
    }
}
