import React, { useState } from "react";
import styled from "styled-components";

const CreateDestinations = (props) => {
    // const [days, setDays] = useState(props.days);
    // const [endDate, setEndDate] = useState("");

    const handleSubmit = () => {
        // if (!!formValidation()) {
        //     console.log('handle submit');
        // };
    }

    // const formValidation = () => {
    //     if (startDate === "") {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };


    return (
        <form onSubmit={handleSubmit}>
            {props.days} days
            <input type="submit" value="Submit" />
        </form>
    );
};

export default CreateDestinations;
