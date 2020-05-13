import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import moment from "moment";
import { Dropdown, Form, Select, Input } from "semantic-ui-react";


const CreateDestinations = (props) => {
    const [days, setDays] = useState([...props.days]);
    // const [endDate, setEndDate] = useState(props.end);
    // const [startDate, setStartDate] = useState(props.start);
    // const [destinations, setDestinations] = useState([""]);
    // const [daysOptions, setDaysOptions] = useState([]);


    // const formValidation = () => {
    //     if (startDate === "") {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };

    const formatDays = (days) => {
        if (!days || days.length <= 0 ) {
            return {}
        }

        return days.map(d=> {
            return {
                'key': d,
                'text': d,
                'value' : d
            }
        })
    }
    


    return (
        <Form>
            {/* {days} days */}
            <Form.Field control={Input} label="City" placeholder="City" />
            <Form.Field
                control={Select}
                label="Start Date"
                options={formatDays(days)}
                placeholder="Gender"
            />
            <Form.Field
                control={Select}
                label="End Date"
                options={formatDays(days)}
                placeholder="Gender"
            />
            <Form.Button>Submit</Form.Button>
        </Form>
    );
};

export default CreateDestinations;
