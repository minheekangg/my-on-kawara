import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";

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
        var a = moment(startDate);
        var b = moment(endDate);
        debugger
        return a.diff(b, "days") + 1;
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
            <form onSubmit={handleSubmit}>
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
                <input type="submit" value="Submit" />
            </form>
        </StyledFormWrapper>
    );
};

export default CreateDates;
