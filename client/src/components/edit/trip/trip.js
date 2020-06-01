import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { Button, Form, Input, TextArea, Dropdown } from "semantic-ui-react";

const StyledFormWrapper = styled.div`
    
`;

const CreateTrip = (props) => {
    const [days, setDays] = useState([]);
    const [people, setPeople] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [form, setState] = useState({
        startDate: props.startDate,
        title: props.title,
        endDate: props.endDate,
        content: props.content,
    });

    useEffect(() => {
        if (!!props.destinations && props.destinations.length > 0) {
            props.destinations.map(d=> {
                return setDestinations(destinations => destinations.concat({city: d.city, dates: d.dates}))
            })
        }
        if (!!props.people && props.people.length > 0) {
            props.people.map(d => setPeople(people=>people.concat({name: d.name})))
        }

        if (!!props.startDate && !!props.endDate) {
            var dates = [];

            var currDate = moment(props.startDate, "MM/DD/YYYY").startOf('day');
            var lastDate = moment(props.endDate, "MM/DD/YYYY").startOf('day');
            dates.push(currDate.clone().format("MM/DD/YYYY"))

            while (currDate.add(1, 'days').diff(lastDate) <= 0) {
                dates.push(currDate.clone().format("MM/DD/YYYY"));
            }
            
            dates.map(d=>setDays(days=>days.concat({'key': d, 'text': d, 'value': d })))
        }
        
        return 
    }, [setPeople, setDestinations, props, setDays]);

    const formValidation = () => {
        if (form.startDate !== "" && form.endDate !== "" && form.title !== "") {
            return true;
        } else {
            return false;
        }
    };

    const calculateDays = () => {
           
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!!formValidation()) {
            calculateDays();
            // props.createTrip({...form, people: people});
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

    const handleChange = (value, key, idx) => {
        let newDestinations = [...destinations];
        let current = newDestinations[idx];
        current[key] = value;

        setDestinations(newDestinations);
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
                        {   people.length > 0 && 
                            people.map((p, idx)=> {
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
                {
                    destinations.map((d, idx) => {
                        const dates = d.dates.map(dt=>({'key': dt, 'value': dt, 'text': dt}))
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
                                    Days:
                                        <Dropdown
                                        placeholder='Days in this city'
                                        name="days"
                                        multiple
                                        selection
                                        fluid
                                        value={dates}
                                        options={days}
                                        onChange={(e, { value }) => handleChange(value, "dates", idx)}
                                    />
                                </label>
                            </Form.Field>
                        </div>
                    })
                }
                {/* <Button onClick={handleAddBtn}>+</Button>
                <Button onClick={handleSubtractBtn}>-</Button> */}
                <Button type="submit" style={{width: '100%', marginTop: '30px'}}>Submit</Button>
            </Form>
        </StyledFormWrapper>
    );
};

export default CreateTrip;
