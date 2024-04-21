import React, { useRef, useState, useEffect } from 'react';
import './search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';
import { searchFlight, logoutUser, fetchAirportMetadata } from '../apiService';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const authToken = localStorage.getItem('token');
    const navigate = useNavigate();
    const [fromIataCode, setFromIataCode] = useState(''); 
    const [toIataCode, setToIataCode] = useState(''); 
    const dateRef = useRef('');
    const peopleRef = useRef(0);
    const [fromSuggestions, setFromSuggestions] = useState([]);
    const [toSuggestions, setToSuggestions] = useState([]);
    const [airportData, setAirportData] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchAirportMetadata();
                if (data && data.airportMetadata) {
                    setAirportData(data.airportMetadata);
                }
            } catch (error) {
                if (error.authError) {
                    if(authToken){
                    logoutUser();
                    }
    
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                }
                else{
                console.error('Search failed:', error);
                }
            }
        })();
    }, []);

    const filterSuggestions = (inputValue, locationType) => {
        if (inputValue.length > 0) {
            const filteredData = airportData.filter(airport =>
                airport.airportName.toLowerCase().includes(inputValue.toLowerCase()) ||
                airport.cityName.toLowerCase().includes(inputValue.toLowerCase()) ||
                airport.iataCode.toLowerCase().includes(inputValue.toLowerCase())
            );
            
            locationType === 'from' ? setFromSuggestions(filteredData) : setToSuggestions(filteredData);
        } else {
            locationType === 'from' ? setFromSuggestions([]) : setToSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion, locationType) => {
        const inputValue = `${suggestion.airportName} (${suggestion.iataCode}), ${suggestion.cityName}`;
        if (locationType === 'from') {
            setFromIataCode(suggestion.iataCode);
            document.getElementById('from-input').value = inputValue;
            setFromSuggestions([]);
        } else {
            setToIataCode(suggestion.iataCode);
            document.getElementById('to-input').value = inputValue;
            setToSuggestions([]);
        }
    };

    const searchHandler = async () => {
        const departureDate = dateRef.current.value;
        const adultsCount = peopleRef.current.value;

        if(fromIataCode === "" || toIataCode === "" || departureDate === "" || adultsCount <= 0){
            return alert("All fields are required and number of people must be greater than 0!");
        }

        const searchData = {
            "originLocation": fromIataCode,
            "destinationLocation": toIataCode,
            "departureDate": departureDate,
            "adultsCount": adultsCount,
            "childrenCount": 0,
            "infantsCount": 0,
            "maxFlightOffers": 15
        };
        
        try {
            const searchResults = await searchFlight(searchData);
            navigate('/flights', { state: { searchResults: searchResults } });
        } catch (error) {
            if (error.authError) {
                if(authToken){
                logoutUser();
                }

                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
            else{
            console.error('Search failed:', error);
            }
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
                            <input 
                              type="text" 
                              placeholder='Starting point?' 
                              id="from-input" 
                              onChange={(e) => filterSuggestions(e.target.value, 'from')}
                            />
                            {fromSuggestions.length > 0 && (
                                <ul className="autocomplete-suggestions">
                                    {fromSuggestions.map((suggestion, index) => (
                                        <li key={index} onClick={() => handleSuggestionClick(suggestion, 'from')}>
                                            {`${suggestion.airportName}, ${suggestion.cityName} (${suggestion.iataCode})`}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </FormGroup>
                    <FormGroup className="d-flex gap-3 form__group form__group-fast">
                        <span><i className="ri-map-pin-line"></i></span>
                        <div>
                            <h6>To</h6>
                            <input 
                              type="text" 
                              placeholder='Destination?' 
                              id="to-input" 
                              onChange={(e) => filterSuggestions(e.target.value, 'to')}
                            />
                            {toSuggestions.length > 0 && (
                                <ul className="autocomplete-suggestions">
                                    {toSuggestions.map((suggestion, index) => (
                                        <li key={index} onClick={() => handleSuggestionClick(suggestion, 'to')}>
                                            {`${suggestion.airportName}, ${suggestion.cityName} (${suggestion.iataCode})`}
                                        </li>
                                    ))}
                                </ul>
                            )}
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
