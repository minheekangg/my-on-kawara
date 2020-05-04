import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import moment from "moment";
import { Dropdown, Form, Select, Input } from "semantic-ui-react";

const options = [];

const CreateDestinations = (props) => {
    const [days, setDays] = useState(props.days);
    const [endDate, setEndDate] = useState(props.end);
    const [startDate, setStartDate] = useState(props.start);
    const [destinations, setDestinations] = useState([""]);
    const [daysOptions, setDaysOptions] = useState([]);

    useEffect(() => {
        function formatDays(){
            console.log("props are", props);
            var daysArr = [];
            var counter = 0;
            var day = moment(startDate).format("MM/DD/YYYY");
            // var end = moment(endDate, "MM/DD/YYYY");

            while (counter <= days) {
                console.log("day is", day);
                daysArr.push({
                    key: day,
                    text: day,
                    value: day,
                });

                day = moment(day).add(1, "days").format("MM/DD/YYYY");

                counter++;
            }

            console.log("days are", daysArr);
            return setDaysOptions(daysArr);
        };

        formatDays();
    });
    

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
            {days} days
            <Form.Field control={Input} label="City" placeholder="City" />
            {daysOptions.length > 0 && (
                <Form.Field
                    control={Select}
                    label="Gender"
                    options={options}
                    placeholder="Gender"
                />
            )}
            <input type="submit" value="Submit" />
        </form>
    );
};

export default CreateDestinations;
