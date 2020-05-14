import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import moment from "moment";
import { Form, Select, Input, Button } from "semantic-ui-react";


const CreateDestinations = (props) => {
    const [days] = useState([...props.days]);
    const [destination1, setDestination1] = useState();
    const [destination2, setDestination2] = useState();
    const [destination3, setDestination3] = useState();

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

    const handleChange = (value, key, num)=> {
        let newInput = {};
        newInput[key] = value;
        
        if (num === 1) {
            setDestination1(prev =>({...prev, ...newInput}));
        } else if (num === 2) {
            setDestination2(prev => ({ ...prev, ...newInput }));
        } else if (num === 3) {
            setDestination3(prev => ({ ...prev, ...newInput }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const trips = [];
        trips.push(destination1);
        trips.push(destination2);
        trips.push(destination3);

        const filteredTrips = trips.filter(t=>t!==undefined)

        return props.createDestinations(filteredTrips);
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field
                control={Input}
                label="City"
                onChange={(e, { value }) => handleChange(value, "city", 1)}
            />
            <Form.Field
                control={Select}
                onChange={(e, { value }) => handleChange(value, "startDate", 1)}
                label="Start Date"
                options={formatDays(days)}
            />
            <Form.Field
                control={Select}
                label="End Date"
                options={formatDays(days)}
                onChange={(e, { value }) => handleChange(value, "endDate", 1)}
            />
            <Form.Field
                control={Input}
                label="City"
                placeholder="City"
                onChange={(e, { value }) => handleChange(value, "city", 2)}
            />
            <Form.Field
                control={Select}
                label="Start Date"
                options={formatDays(days)}
                onChange={(e, { value }) => handleChange(value, "startDate", 2)}
            />
            <Form.Field
                control={Select}
                label="End Date"
                options={formatDays(days)}
                onChange={(e, { value }) => handleChange(value, "endDate", 2)}
            />
            <Form.Field
                control={Input}
                label="City"
                onChange={(e, { value }) => handleChange(value, "city", 3)}
            />
            <Form.Field
                control={Select}
                label="Start Date"
                options={formatDays(days)}
                onChange={(e, { value }) => handleChange(value, "startDate", 3)}
            />
            <Form.Field
                control={Select}
                label="End Date"
                options={formatDays(days)}
                onChange={(e, { value }) => handleChange(value, "endDate", 2)}
            />
            <Form.Button>Submit</Form.Button>
        </Form>
    );
};

export default CreateDestinations;
