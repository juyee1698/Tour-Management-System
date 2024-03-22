import React, { useRef } from 'react';
import './search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';
import { searchFlight } from '../apiService';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const navigate = useNavigate();
    const fromLocationRef = useRef('');
    const toLocationRef = useRef('');
    const dateRef = useRef('');
    const peopleRef = useRef(0);

    const searchHandler = async () => {
        const originLocation = fromLocationRef.current.value;
        const destinationLocation = toLocationRef.current.value;
        const departureDate = dateRef.current.value;
        const adultsCount = peopleRef.current.value;

        if(originLocation === "" || destinationLocation === "" || departureDate === "" || adultsCount <= 0){
            return alert("All fields are required and number of people must be greater than 0!");
        }

        const searchData = {"originLocation":originLocation,
                            "destinationLocation":destinationLocation,
                            "departureDate":departureDate,
                            "adultsCount":adultsCount,
                            "childrenCount": 0,
                            "infantsCount": 0,
                            "maxFlightOffers":15};
        
        try {
            console.log("pohocha")
            const searchResults = await searchFlight(searchData);
            navigate('/flights', { state: { searchResults: searchResults } });
        } catch (error) {
            console.error('Search failed:', error);
        }

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
