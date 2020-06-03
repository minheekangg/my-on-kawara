import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form, Input, TextArea } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import moment from "moment";

import CreateDestination from '../destination';


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

const CreateTrip = (props) => {
    const [isTripFilledOut, setIsTripFilledOut] = useState(false);
    const [people, setPeople] = useState([{
        name: "",
    }]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [form, setForm] = useState({
        title: props.title,
        content: props.content
    });


    const formValidation = () => {
        if (form.startDate !== "" && form.endDate !== "" && form.title !== "") {
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!!formValidation()) {
            const formattedStartDate = moment(startDate).utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
            const formatttedEndDate = moment(endDate).utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
            
            props.createTrip({...form, people, startDate: formattedStartDate, endDate: formatttedEndDate});
            setIsTripFilledOut(true)
        };
  
    };

    const updateField = e => {
        setForm({
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

    if (isTripFilledOut) {
        return <CreateDestination minDate={startDate} maxDate={endDate} />
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
                        <DatePicker
                            selected={startDate} 
                            onChange={date => {
                                setStartDate(date)
                                setEndDate(date)
                            }}
                            showMonthDropdown
                            showYearDropdown
                        />
                    </label>
                </Form.Field>
                <Form.Field>
                    <label>
                        End Date:
                        <DatePicker
                            selected={endDate} 
                            onChange={date => setEndDate(date)}
                            showMonthDropdown
                            showYearDropdown
                        />
                    </label>
                </Form.Field>
                <Form.Field>
                    <label>
                        People:
                        {
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
                <Button type="submit" style={{width: '100%'}}>Submit</Button>
            </Form>
        </StyledFormWrapper>
    );
};

export default CreateTrip;
