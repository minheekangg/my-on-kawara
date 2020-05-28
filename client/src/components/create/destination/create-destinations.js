import React, { useState } from "react";
import styled from "styled-components";

import { Form, Dropdown, Button, Segment } from "semantic-ui-react";

const StyledFormWrapper = styled.div`
    max-width: 300px;
    margin: auto;
    height: 100vh;
    display: flex;
    align-items: center;
`;

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
        <StyledFormWrapper>
            <Form onSubmit={handleSubmit}>
                <Segment>
                    {
                        destinations.map((d, idx) => {
                            return <div key={`destination-${idx}`}>
                                <Form.Field>
                                    <label>
                                        City:
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="Where does this take place?"
                                            value={d.city}
                                            onChange={(e) => handleChange(e.target.value, "city", idx)}
                                            required
                                        />
                                    </label>
                                </Form.Field>
                                <Form.Field>
                                    <label>
                                        Days:
                                        <Dropdown 
                                            placeholder='Days in this city' 
                                            name="days" 
                                            multiple 
                                            selection 
                                            fluid
                                            options={formatDays(days)} 
                                            onChange={(e, { value }) => handleChange(value, "dates", idx)} 
                                        />
                                    </label>
                                </Form.Field>
                            </div>
                        })
                    }
                <Button onClick={handleAddBtn}>+</Button>
                <Button onClick={handleSubtractBtn}>-</Button>
                </Segment>
                <Form.Button>Submit</Form.Button>
            </Form>
        </StyledFormWrapper>
    );
};

export default CreateDestinations;
