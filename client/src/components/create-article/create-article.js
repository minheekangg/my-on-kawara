import React, { useState } from "react";

import styled from "styled-components";

const CreateArticle = (props) => {
    const [title, setTitle] = useState("");

    const handleSubmit = () => {
        if (!!formValidation()) {
            console.log('handle submit');
        };
    }

    const formValidation = () => {
        if (title === "") {
            return true;
        } else {
            return false;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    placeholder="title goes here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    placeholder="title goes here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    placeholder="title goes here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
};

export default CreateArticle;
