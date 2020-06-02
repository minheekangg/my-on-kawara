import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { Button, Form, Input, TextArea, Dropdown } from "semantic-ui-react";

import Destination from '../destination';

const StyledFormWrapper = styled.div`
    
`;

const Trip = (props) => {
    const [days, setDays] = useState([]);
    const [people, setPeople] = useState([]);
    const [form, setState] = useState({
        startDate: props.startDate,
        title: props.title,
        endDate: props.endDate,
        content: props.content,
    });

    useEffect(() => {
        if (!!props.people && props.people.length > 0) {
            props.people.map(d => setPeople(people => people.concat({ name: d.name })))
        }

        return
    }, [setPeople, props, setDays]);


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
            props.updateProp({...form, people: people});
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
        return <Destination days={days} />
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
                        Start Date:
                        <input
                            type="text"
                            name="startDate"
                            placeholder="When did the trip start?"
                            value={form.startDate}
                            onChange={updateField}
                            required
                        />
                    </label>
                </Form.Field>
                <Form.Field>
                    <label>
                        End Date:
                        <input
                            type="text"
                            name="endDate"
                            placeholder="When did the trip end?"
                            value={form.endDate}
                            onChange={updateField}
                            required
                        />
                    </label>
                </Form.Field>
                <Form.Field>
                    <label>
                        People:
                        {people.length > 0 &&
                            people.map((p, idx) => {
                                return <Input
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
                </Form.Field>
                <Form.Field>
                    <label>
                        Content:
                    <TextArea
                            type="text-area"
                            name="content"
                            placeholder="Tell me more"
                            value={form.content}
                            onChange={updateField}
                            style={{ minHeight: 100 }}
                        />
                    </label>
                </Form.Field>
                <Button type="submit" style={{width: '100%'}}>Next</Button>
            </Form>
        </StyledFormWrapper>
    );
};

export default Trip;
