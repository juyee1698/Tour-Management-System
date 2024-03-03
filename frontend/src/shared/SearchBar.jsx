import React, { useRef } from 'react';
import './search-bar.css'; // Make sure this path is correct
import { Col, Form, FormGroup } from 'reactstrap';

const SearchBar = () => {
    const fromLocationRef = useRef('');
    const toLocationRef = useRef('');
    const dateRef = useRef('');
    const peopleRef = useRef(0);

    const searchHandler = () => {
        const fromLocation = fromLocationRef.current.value;
        const toLocation = toLocationRef.current.value;
        const date = dateRef.current.value;
        const numberOfPeople = peopleRef.current.value;

        if(fromLocation === "" || toLocation === "" || date === "" || numberOfPeople <= 0){
            return alert("All fields are required and number of people must be greater than 0!");
        }

        // Assuming you would do something with the input values here
        console.log({fromLocation, toLocation, date, numberOfPeople});
    }

    return (
        <Col lg='12'>
            <div className="search__bar">
                <Form className="d-flex align-items-center gap-4">
                    <FormGroup className="d-flex gap-3 form__group form__group-fast">
                        <span><i className="ri-map-pin-line"></i></span>
                        <div>
                            <h6>From</h6>
                            <input type="text" placeholder='Starting point?' ref={fromLocationRef}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="d-flex gap-3 form__group form__group-fast">
                        <span><i className="ri-map-pin-line"></i></span>
                        <div>
                            <h6>To</h6>
                            <input type="text" placeholder='Destination?' ref={toLocationRef}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="d-flex gap-3 form__group form__group-fast">
                        <span><i className="ri-calendar-2-fill"></i></span>
                        <div>
                            <h6>Date</h6>
                            <input type="date" ref={dateRef}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="d-flex gap-3 form__group">
                        <span><i className="ri-group-line"></i></span>
                        <div>
                            <h6>People</h6>
                            <input type="number" placeholder='How many?' min="1" ref={peopleRef}/>
                        </div>
                    </FormGroup>
                    <span className="search__icon" onClick={searchHandler}><i className="ri-search-2-line"></i></span>
                </Form>
            </div>
        </Col>
    );
}

export default SearchBar;
