import React,{useRef} from 'react';
import './search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';

const SearchBar = () => {

    const locationRef = useRef('');
    const dateRef = useRef('');
    const groupSizeRef = useRef(0);

    const searchHandler = () => {
        const location = locationRef.current.value
        const date = locationRef.current.value
        const groupSize = locationRef.current.value

        if(location === "" || date === "" || groupSize === ""){
            return alert("All fields are required!");
        }
    }

    return <Col lg='12'>
        <div className="search__bar">
            <Form className="d-flex align-items-center gap-4">
                <FormGroup className="d-flex gap-3 form__group form__group-fast">
                <span><i class="ri-map-pin-line"></i></span>
                <div>
                    <h6>Location</h6>
                    <input type="text" placeholder='Buddy, Trip where?' ref={locationRef}/>
                </div>
                </FormGroup>
                <FormGroup className="d-flex gap-3 form__group form__group-fast">
                <span><i class="ri-calendar-2-fill"></i></span>
                <div>
                    <h6>Date</h6>
                    <input type="date"  ref={dateRef}/>
                </div>
                </FormGroup>
                <FormGroup className="d-flex gap-3 form__group form">
                <span><i class="ri-group-line"></i></span>
                <div>
                    <h6>People</h6>
                    <input type="number" placeholder='0' ref={groupSizeRef}/>
                </div>
                </FormGroup>

                <span className="search__icon" type='submit' onClick={searchHandler}><i class="ri-search-2-line"></i></span>
            </Form>
        </div>
    </Col>
}

export default SearchBar;