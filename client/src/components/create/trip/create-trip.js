import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { Button, Form } from "semantic-ui-react";

import CreateDestination from '../destination';

const StyledFormWrapper = styled.div`
    max-width: 300px;
    margin: auto;
    height: 100vh;
`;

const CreateTrip = (props) => {
    const [days, setDays] = useState([]);
    const [people, setPeople] = useState([{
        name: "",
    }]);
    const [form, setState] = useState({
        startDate: props.startDate,
        title: props.title,
        endDate: props.endDate,
        content: props.content
    });


    const formValidation = () => {
        if (form.startDate !== "" && form.endDate !== "" && form.title !== "") {
            return true;
        } else {
            return false;
        }
    };

    const calculateDays = () => {
        var dates = [];

        var currDate = moment(form.startDate, "MM/DD/YYYY").startOf('day');
        var lastDate = moment(form.endDate, "MM/DD/YYYY").startOf('day');
        dates.push(currDate.clone().format("MM/DD/YYYY"))

        while (currDate.add(1, 'days').diff(lastDate) <= 0) {
            dates.push(currDate.clone().format("MM/DD/YYYY"));
        }

        setDays(dates);   
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!!formValidation()) {
            calculateDays();
            props.createTrip({...form, people: people});
        };
  
    };

    const updateField = e => {
        setState({
            ...form,
            [e.target.name]: e.target.value
        });
        return;
    };

    const handlePeopleChange = (name, idx) => {
        let users = [...people];
        users[idx].name = name;
        setPeople(users);
        return;
    }

    const handleAddPeople = (e) => {
        e.preventDefault();
        setPeople(people.concat({ name: "" }))
    }

    const handleSubtractPeople = (e) => {
        e.preventDefault();
        if (people.length <= 1) {
            return;
        }
        let updatedPeople = [...people];
        updatedPeople.pop();
        setPeople(updatedPeople)
        return;
    }

    if (days && days.length > 0) {
        return <CreateDestination days={days} />
    }

    return (
        <StyledFormWrapper>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>
                        Title:
                            <input
                            type="text"
                            name="title"
                            placeholder="Title of the trip"
                            value={form.title}
                            onChange={updateField}
                            required
                        />
                    </label>
                </Form.Field>
                <Form.Field>
                    <label>
                        startDate:
                        <input
                            type="text"
                            name="startDate"
                            placeholder="startDate goes here"
                            value={form.startDate}
                            onChange={updateField}
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
                            value={form.endDate}
                            onChange={updateField}
                            required
                        />
                    </label>
                </Form.Field>
                <Form.Field>
                    <label>
                        People:
                        {
                            people.map((p, idx)=> {
                                return <input
                                    type="person"
                                    name="person"
                                    placeholder="person name goes here"
                                    value={p.name}
                                    key={`person${idx}`}
                                    onChange={(e) => handlePeopleChange(e.target.value, idx)}
                                    required
                                />
                            })
                        }
                        
                    </label>
                    <Button onClick={handleAddPeople}>+</Button>
                    <Button onClick={handleSubtractPeople}>-</Button>
                    <Form.Field>
                        <label>
                            content:
                        <input
                                type="text-area"
                                name="content"
                                placeholder="tell me more"
                                value={form.content}
                                onChange={updateField}
                            />
                        </label>
                    </Form.Field>
                </Form.Field>
                <Button type="submit">Submit</Button>
            </Form>
        </StyledFormWrapper>
    );
};

export default CreateTrip;
