import React, { useState } from "react";
// import styled from "styled-components";
import moment from "moment";

const CreateDestinations = (props) => {
    const [days, setDays] = useState(props.days);
    const [endDate, setEndDate] = useState(props.end);
    const [startDate, setStartDate] = useState(props.start);
    const [destinations, setDestinations] = useState([""]);

    const formatDays = () => {
        console.log('props are', props)
        var daysArr = [];
        var counter = 0;
        var day = moment(startDate, "MM/DD/YYYY");
        // var end = moment(endDate, "MM/DD/YYYY");

        while (counter <= days) {
            console.log("day is", day);
            daysArr.push(day);
            day = moment(day).add(1, "days").format("MM/DD/YYYY");
            counter++;
        }
        debugger
        console.log("days are", daysArr);
        return daysArr;
    }

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
            {formatDays()} days
            <input type="submit" value="Submit" />
        </form>
    );
};

export default CreateDestinations;
