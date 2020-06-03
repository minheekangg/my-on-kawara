import React, { useState } from "react";
import styled from "styled-components";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import { Form, Button } from "semantic-ui-react";

const StyledFormWrapper = styled.div`
    max-width: 300px;
    margin: auto;
    height: 100vh;
    display: flex;
    align-items: center;

    .ui.form{
        width: 100%;
    }

    .react-datepicker-wrapper {
        display: block!important;
    }
`;

const CreateDestinations = (props) => {
    const [destinations, setDestinations] = useState([{
        city: "",
        startDate: "",
        endDate: ""
    }]);

    const handleChange = (value, key, idx)=> {
        let newDestinations = [...destinations];
        let current = newDestinations[idx];
        
        current[key] = value;
        
        setDestinations(newDestinations);
        return;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        destinations.map(city=>{
            const startDate = moment(city.startDate).utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
            city.startDate = startDate;

            const endDate = moment(city.endDate).utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            city.endDate = endDate;

            return city;
        })
        
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
                    {
                        destinations.map((d, idx) => {
                            return <div key={`destination-${idx}`}>
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
                                        Start Date:
                                        <DatePicker
                                            onChange={date => handleChange(date, "startDate", idx)}
                                            selected={d.startDate}
                                            minDate={props.minDate}
                                            maxDate={props.maxDate}
                                            startDate={props.minDate}
                                        />
                                    </label>
                                    <label>
                                        End Date:
                                        <DatePicker
                                            onChange={date => handleChange(date, "endDate", idx)}
                                            selected={d.endDate}
                                            minDate={props.minDate}
                                            maxDate={props.maxDate}
                                            startDate={d.startDate}
                                        />
                                    </label>
                                </Form.Field>
                            </div>
                        })
                    }
                <Button onClick={handleAddBtn}>+</Button>
                <Button onClick={handleSubtractBtn}>-</Button>
                <Form.Button style={{ marginTop: '30px', width: '100%' }}>Submit</Form.Button>
            </Form>
        </StyledFormWrapper>
    );
};

export default CreateDestinations;
