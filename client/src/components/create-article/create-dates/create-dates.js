import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { Button, Form } from "semantic-ui-react";

import CreateDestinations from '../create-destinations';

const StyledFormWrapper = styled.div`
    max-width: 300px;
    margin: auto;
    height: 100vh;
`;

const CreateDates = (props) => {
    const [startDate, setstartDate] = useState(props.startDate);
    const [endDate, setEndDate] = useState(props.endDate);
    const [datesValidated, setDatesValidated] = useState(false);

    const formValidation = () => {
        if (startDate !== "" && endDate !== "") {
            return true;
        } else {
            return false;
        }
    };

    const calculateDays = () => {
        var dates = [];

        var currDate = moment(startDate, "MM/DD/YYYY").startOf('day');
        var lastDate = moment(endDate, "MM/DD/YYYY").startOf('day');
        dates.push(currDate.clone().format("MM/DD/YYYY"))

        while (currDate.add(1, 'days').diff(lastDate) <= 0) {
            dates.push(currDate.clone().format("MM/DD/YYYY"));
        }

        return dates;   
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!!formValidation()) {
            calculateDays();
            props.updateProp({startDate, endDate});
            setDatesValidated(true);
        };
    };

    if (datesValidated) {
        return <CreateDestinations start={startDate} end={endDate} days={calculateDays()} />
    }

    return (
        <StyledFormWrapper>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>
                        startDate:
                        <input
                            type="text"
                            name="startDate"
                            placeholder="startDate goes here"
                            value={startDate}
                            onChange={(e) => setstartDate(e.target.value)}
                            required
                        />
                    </label>
                </Form.Field>
                <Form.Field>
                    <label>
                        endDate:
                        <input
                            type="text"
                            name="endDate"
                            placeholder="endDate goes here"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </label>
                </Form.Field>

                <Button type="submit">Submit</Button>
            </Form>
        </StyledFormWrapper>
    );
};

export default CreateDates;
