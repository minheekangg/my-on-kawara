import React, { useState } from "react";
import Moment from "react-moment";
// import styled from "styled-components";

import CreateDestinations from '../create-destinations';

const CreateDates = (props) => {
    const [startDate, setstartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [datesValidated, setDatesValidated] = useState(false);

    const handleSubmit = () => {
        if (!!formValidation()) {
            setDatesValidated(true);
        };
    }

    const formValidation = () => {
        if (startDate === "" && <Moment>{startDate}</Moment> && endDate === "" && <Moment>{endDate}</Moment>) {
            return true;
        } else {
            return false;
        }
    };

    const calculateDays = ()=> {
        var a = <Moment>{startDate}</Moment>;
        var b = <Moment>{endDate}</Moment>;
        return a.diff(b, "days")+1; 
    }

    if (datesValidated) {
        return <CreateDestinations start={startDate} end={endDate} days={calculateDays()} />
    }

    return (
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
    );
};

export default CreateDates;
