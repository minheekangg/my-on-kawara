import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Form, Dropdown, Button, Segment } from "semantic-ui-react";


const StyledFormWrapper = styled.div`
    max-width: 300px;
    margin: auto;
    height: 100vh;
    display: flex;
    align-items: center;

    .ui.form{
        width: 100%;
    }
`;

const Destination = (props) => {
    const [days] = useState(props.days);
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        if (!!props.destinations && props.destinations.length > 0) {
            props.destinations.map(d => {
                return setDestinations(destinations => destinations.concat({ city: d.city, dates: d.dates }))
            })
        }

        return
    }, [ setDestinations, props]);

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
        debugger
        // return props.Destination(destinations);
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
                    {
                        destinations.map((d, idx) => {
                            const oldDates = d.dates.map(dt=>dt.date);
                            console.log(oldDates, days)
                            return <Segment key={`destination-${idx}`} style={{marginBottom: '20px'}}>
                                <Form.Field>
                                    <label>
                                        City:
                                        <input
                                            type="text"
                                            name="city"
                                            label="City"
                                            placeholder="Where does this take place?"
                                            value={d.city}
                                            onChange={(e) => handleChange(e.target.value, "city", idx)}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Prev Days:
                                        <Dropdown 
                                            placeholder='Days in this city' 
                                            name="days" 
                                            multiple 
                                            selection
                                            disabled 
                                            fluid
                                            value={oldDates}
                                            options={formatDays(days)} 
                                        />
                                    </label>
                                    <label>
                                        Updated Days:
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
                            </Segment>
                        })
                    }
                <Button onClick={handleAddBtn}>+</Button>
                <Button onClick={handleSubtractBtn}>-</Button>
                <Form.Button style={{ marginTop: '30px', width: '100%' }}>Next</Form.Button>
            </Form>
        </StyledFormWrapper>
    );
};

export default Destination;
