import React, { useState } from "react";
// import styled from "styled-components";
// import moment from "moment";
import { Form, Select, Input, Button } from "semantic-ui-react";


const CreateDestinations = (props) => {
    const [days] = useState(props.days);
    const [destinations, setDestinations] = useState([{
        city: "",
        startDate: "",
        endDate: "",
    }]);

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

    const handleChange = (value, key, idx)=> {
        let newDestinations = [...destinations];
        let current = newDestinations[idx];
        current[key] = value;
        setDestinations(newDestinations);
        return;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        return props.createDestinations(destinations);
    }


    return (
        <Form onSubmit={handleSubmit}>
                {
                    destinations.map((d, idx) => {
                        return <Form.Group key={`destination-${idx}`}>
                            <Form.Field
                                control={Input}
                                label="City"
                                name="city"
                                value={d.city}
                                onChange={(e) => handleChange(e.target.value, "city", idx)}
                            />
                            <Form.Field
                                control={Select}
                                onChange={(e, { value }) => handleChange(value, "startDate", idx)}
                                label="Start Date"
                                options={formatDays(days)}
                            />
                            <Form.Field
                                control={Select}
                                label="End Date"
                                options={formatDays(days)}
                                onChange={(e, { value }) => handleChange(value, "endDate", idx)}
                            />
                        </Form.Group>
                    })
                }
            <Button onClick={() => setDestinations(destinations.concat({ city: "", startDate: "", endDate: "" }))}>+</Button>
            <Form.Button>Submit</Form.Button>
        </Form>
    );
};

export default CreateDestinations;
