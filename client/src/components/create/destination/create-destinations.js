import React, { useState } from "react";
// import styled from "styled-components";
// import moment from "moment";
import { Form, Dropdown, Input, Button } from "semantic-ui-react";

const CreateDestinations = (props) => {
    const [days] = useState(props.days);
    const [destinations, setDestinations] = useState([{
        city: "",
        dates: []
    }]);


    const formatDays = (days) => {
        if (!days || days.length <= 0 ) {
            return []
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

    const handleAddBtn = (e) => {
        e.preventDefault();
        setDestinations(destinations.concat({ city: "", dates: [] }));
        return;
    }

    const handleSubtractBtn = (e) => {
        e.preventDefault();
        if (destinations.length <= 1) {
            return;
        }
        let updatedDestinations = [...destinations];
        updatedDestinations.pop();
        setDestinations(updatedDestinations)
        return;
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
                            <Dropdown 
                                placeholder='Skills' 
                                name="days" 
                                fluid 
                                multiple 
                                selection 
                                options={formatDays(days)} 
                                onChange={(e, { value }) => handleChange(value, "dates", idx)} 
                            />
                        </Form.Group>
                    })
                }
            <Button onClick={handleAddBtn}>+</Button>
            <Button onClick={handleSubtractBtn}>-</Button>
            <Form.Button>Submit</Form.Button>
        </Form>
    );
};

export default CreateDestinations;
