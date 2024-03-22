import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../shared/SearchBar.jsx';
import FlightOffer from './FlightOffer.jsx';
import Filters from './Filters.jsx';
import '../styles/flights.css';

const Flights = () => {
    const location = useLocation();
    const [flightData, setFlightData] = useState(null);
    const [airlines, setAirlines] = useState([]);
    const [filteredFlightData, setFilteredFlightData] = useState([]);

    const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('all');
    const [selectedStops, setSelectedStops] = useState('all');
    const [selectedBudget, setSelectedBudget] = useState(2000);
    const [selectedAirline, setSelectedAirline] = useState('all');

    useEffect(() => {
        if (location.state?.searchResults) {
            const newFlightData = location.state.searchResults;
            setFlightData(newFlightData);

            const airlineSet = new Set();
            newFlightData.flightsResult.forEach(offer => {
                offer.itineraries.forEach(itinerary => {
                    itinerary.segments.forEach(segment => {
                        airlineSet.add(segment.carrierCode);
                    });
                });
            });
            setAirlines([...airlineSet]);
        }
    }, [location, location.state]);

    useEffect(() => {
        if (!flightData) return;

        const applyFilters = () => {
            let filteredData = flightData.flightsResult;

            // Filter by time of day
            if (selectedTimeOfDay !== 'all') {
                filteredData = filteredData.filter(offer => {
                    return offer.itineraries.some(itinerary => {
                        return itinerary.segments.some(segment => {
                            const departureHour = new Date(segment.departure.at).getHours();
                            switch (selectedTimeOfDay) {
                                case 'morning': return departureHour >= 5 && departureHour < 12;
                                case 'afternoon': return departureHour >= 12 && departureHour < 17;
                                case 'evening': return departureHour >= 17 && departureHour < 21;
                                case 'night': return departureHour >= 21 || departureHour < 5;
                                default: return true;
                            }
                        });
                    });
                });
            }

            if (selectedStops !== 'all') {
                filteredData = filteredData.filter(offer => {
                    const stops = offer.itineraries[0].segments.length - 1;
                    switch (selectedStops) {
                        case '0': return stops === 0;
                        case '1': return stops === 1;
                        case '2+': return stops >= 2;
                        default: return true;
                    }
                });
            }

            // Filter by budget
            if (selectedBudget !== 'all') {
                filteredData = filteredData.filter(offer => {
                    return Number(offer.price.total) <= selectedBudget;
                });
            }

            // Filter by airline
            if (selectedAirline !== 'all') {
                filteredData = filteredData.filter(offer => {
                    return offer.itineraries.some(itinerary => {
                        return itinerary.segments.some(segment => {
                            return segment.carrierCode === selectedAirline;
                        });
                    });
                });
            }

            setFilteredFlightData(filteredData);
        }

        applyFilters();
    }, [flightData, selectedTimeOfDay, selectedStops, selectedBudget, selectedAirline]);

    return (
        <div className="flights-container">
            <div className="search-bar-container">
                <SearchBar  />
            </div>
            <div className="content-container">
                <div className="filters-container">
                    <Filters
                        airlines={airlines}
                        selectedTimeOfDay={selectedTimeOfDay}
                        setSelectedTimeOfDay={setSelectedTimeOfDay}
                        selectedStops={selectedStops}
                        setSelectedStops={setSelectedStops}
                        selectedBudget={selectedBudget}
                        setSelectedBudget={setSelectedBudget}
                        selectedAirline={selectedAirline}
                        setSelectedAirline={setSelectedAirline}
                    />
                </div>
                <div className="flight-offers-container">
                    {filteredFlightData.map(offer => (
                        <FlightOffer key={offer.id} offer={offer} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Flights;
