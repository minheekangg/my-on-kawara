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
    const [articleId] = useState(props.articleId);
    const [destinations, setDestinations] = useState([]);
    const [form, setState] = useState({
        title: props.title,
        content: props.content,
    });

    useEffect(() => {
        if (!!props.destinations && props.destinations.length > 0) {
            props.destinations.map(d=> {
                return setDestinations(destinations => destinations.concat({city: d.city, startDate: d.startDate, endDate: d.endDate}))
            })
        }
        if (!!props.people && props.people.length > 0) {
            props.people.map(d => setPeople(people=>people.concat({name: d.name})))
        }
        
        return 
    }, [setPeople, setDestinations, props]);

    const formValidation = props => {
        const requiredFields = ['startDate', 'endDate', 'title', 'content', 'destinations', 'people', 'articleId'];
        requiredFields.forEach(field=> {
            if (form[field] === "") {
                return false;
            }
        })
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = {
            startDate,
            endDate,
            title: form.title,
            content: form.content,
            destinations,
            people,
            articleId,
        }
        if (!!formValidation(params)) {
            props.updateTrip(params);
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

    const handleAdd = (e, field) => {
        e.preventDefault();
        if (field === 'people') {
            setPeople(people.concat({ name: "" }))
        } else if (field === 'destinations') {
            setDestinations(destinations.concat({city: "'"}))
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
        } else if (field === 'destinations') {
            if (destinations.length <= 1) {
                return;
            }
            let updatedDestinations = [...destinations];
            updatedDestinations.pop();
            setDestinations(updatedDestinations)
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
                            onChange={date => setEndDate(date)}
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
                        const minDate = moment(startDate).diff(moment(d.startDate), 'days') > 1 ? moment(startDate).toDate() : moment(d.startDate).toDate();
                        const maxDate = moment(endDate).diff(moment(d.endDate), 'days') < 1 ? moment(endDate).toDate() : moment(d.endDate).toDate()
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
                                {console.log('h', moment(startDate).diff(moment(d.startDate), 'days'), startDate, d.startDate)}
                                {!!d.startDate && !!startDate && !!endDate && 
                                    <label>
                                        Start Date:
                                        <DatePicker
                                            selected={moment(d.startDate).toDate()}
                                            onChange={date => handleChange(date, "startDate", idx)}
                                            // minDate={minDate}
                                            // maxDate={maxDate}
                                        />
                                    </label>
                                }
                                {/* {!!d.endDate && !!endDate && <Form.Field>
                                    <label>
                                        End Date:
                                        <DatePicker
                                            selected={moment(d.endDate).toDate()}
                                            onChange={date => handleChange(date, "endDate", idx)}
                                            minDate={startDate}
                                            maxDate={endDate}
                                        />
                                    </label>
                                </Form.Field>} */}
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
