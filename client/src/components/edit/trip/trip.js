import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { Button, Form, Input, TextArea } from "semantic-ui-react";
import DatePicker from "react-datepicker";

const StyledFormWrapper = styled.div`
    .react-datepicker-wrapper {
        display: block!important;
    }
`;

const CreateTrip = (props) => {
    const [startDate, setStartDate] = useState(props.startDate);
    const [endDate, setEndDate] = useState(props.endDate);
    const [people, setPeople] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [form, setForm] = useState({
        title: props.title,
        content: props.content,
    });
    const [updatedForm, setUpdatedForm] = useState({
        articleId: props.articleId
    })

    useEffect(() => {
        if (!!props.destinations && props.destinations.length > 0) {
            props.destinations.map(d=> {
                return setDestinations(destinations => destinations.concat({_id: d._id, city: d.city, startDate: d.startDate, endDate: d.endDate}))
            })
        }
        if (!!props.people && props.people.length > 0) {
            props.people.map(d => setPeople(people=>people.concat({name: d.name})))
        }
        
        return 
    }, [setPeople, setDestinations, props]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const params =  {
            ...updatedForm
        }

        if (moment(startDate).diff(moment(props.startDate), 'days') !== 0) {
            params.startDate = moment(startDate).utcOffset(0);
        }
        
        if (moment(endDate).diff(moment(props.endDate), 'days') !== 0) {
            params.endDate = moment(endDate).utcOffset(0);
        }
        props.updateTrip(params);
    };

    const updateField = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setUpdatedForm({
            ...updatedForm,
            [e.target.name]: e.target.value
        });
        return;
    };

    const handlePeopleChange = (name, idx) => {
        let users = [...people];
        users[idx].name = name;
        setPeople(users);
        setUpdatedForm({
            ...updatedForm,
            people: users
        });
        return;
    }

    const handleChange = (value, key, idx) => {
        let newDestinations = [...destinations];
        let current = newDestinations[idx];
        
        if (key === 'startDate' || key === 'endDate') {
            value = moment(value).utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        }

        current[key] = value;

        setDestinations(newDestinations);
        setUpdatedForm({
            ...updatedForm,
            destinations: newDestinations
        });
        return;
    }

    const handleAdd = (e, field) => {
        e.preventDefault();
        if (field === 'people') {
            setPeople(people.concat({ name: "" }))
        } else if (field === 'destinations') {
            setDestinations(destinations.concat({city: "", startDate: startDate, endDate: endDate }))
        }
        return;
    }

    const handleSubtract = (e, field) => {
        e.preventDefault();
        if (field === 'people') {
            if (people.length <= 1) {
                return;
            }
            let updatedPeople = [...people];
            updatedPeople.pop();
            setPeople(updatedPeople)
            setUpdatedForm({
                ...updatedForm,
                people: updatedPeople
            });
        } else if (field === 'destinations') {
            if (destinations.length <= 1) {
                return;
            }
            let updatedDestinations = [...destinations];
            updatedDestinations.pop();
            setDestinations(updatedDestinations)
            setUpdatedForm({
                ...updatedForm,
                destinations: updatedDestinations
            });
        }
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
                    {!!startDate && <Form.Field>
                        <label>
                            Start Date:
                            <DatePicker
                                selected={moment(startDate).toDate()}
                                onChange={date => setStartDate(moment(date).utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }))}
                                showMonthDropdown
                                showYearDropdown
                                startDate={moment(startDate).toDate()}
                            />
                        </label>
                    </Form.Field> }
                {!!endDate && <Form.Field>
                    <label>
                        End Date:
                        <DatePicker
                            selected={moment(endDate).toDate()}
                            onChange={date => setEndDate(moment(date).utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }))}
                            showMonthDropdown
                            showYearDropdown
                            startDate={moment(endDate).toDate()}
                        />
                    </label>
                </Form.Field>}
                
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
                    <Button onClick={e => handleAdd(e, 'people')}>+</Button>
                    <Button onClick={e => handleSubtract(e, 'people')}>-</Button>
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
                                        selected={d.startDate ? moment(d.startDate).toDate() : null}
                                        onChange={date => handleChange(date, "startDate", idx)}
                                    />
                                </label>
                                <label>
                                    End Date:
                                    <DatePicker
                                        selected={d.endDate ? moment(d.endDate).toDate() : null}
                                        onChange={date => handleChange(date, "endDate", idx)}
                                    />
                                </label>
                            </Form.Field>
                        </div>
                    })
                }
                <Button onClick={e => handleAdd(e, 'destinations')}>+</Button>
                <Button onClick={e => handleSubtract(e, 'destinations')}>-</Button>

                <Button type="submit" style={{width: '100%', marginTop: '30px'}}>Submit</Button>
            </Form>
        </StyledFormWrapper>
    );
};

export default CreateTrip;
