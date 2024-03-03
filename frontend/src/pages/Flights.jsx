// Flights.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from '../shared/SearchBar.jsx';
import FlightOffer from './FlightOffer.jsx';
import Filters from './Filters.jsx'; // This is a new component for your filters
import '../styles/flights.css';

const Flights = () => {
    const [flightData, setFlightData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // const response = await fetch('???');
            // const data = await response.json();
            const mockApiResponse = {
                "data": [{
                    "type": "flight-offer",
                    "id": "1",
                    "source": "GDS",
                    "instantTicketingRequired": false,
                    "nonHomogeneous": false,
                    "oneWay": false,
                    "lastTicketingDate": "2024-02-10",
                    "lastTicketingDateTime": "2024-02-10",
                    "numberOfBookableSeats": 9,
                    "itineraries": [
                        {
                            "duration": "PT11H",
                            "segments": [
                                {
                                    "departure": {
                                        "iataCode": "JFK",
                                        "at": "2024-02-10T20:00:00"
                                    },
                                    "arrival": {
                                        "iataCode": "LHR",
                                        "at": "2024-02-11T08:05:00"
                                    },
                                    "carrierCode": "6X",
                                    "number": "172",
                                    "aircraft": {
                                        "code": "744"
                                    },
                                    "operating": {
                                        "carrierCode": "6X"
                                    },
                                    "duration": "PT7H5M",
                                    "id": "1",
                                    "numberOfStops": 0,
                                    "blacklistedInEU": false
                                },
                                {
                                    "departure": {
                                        "iataCode": "LHR",
                                        "at": "2024-02-11T10:30:00"
                                    },
                                    "arrival": {
                                        "iataCode": "MAD",
                                        "at": "2024-02-11T13:00:00"
                                    },
                                    "carrierCode": "6X",
                                    "number": "9931",
                                    "aircraft": {
                                        "code": "320"
                                    },
                                    "operating": {
                                        "carrierCode": "6X"
                                    },
                                    "duration": "PT1H30M",
                                    "id": "2",
                                    "numberOfStops": 0,
                                    "blacklistedInEU": false
                                }
                            ]
                        }
                    ],
                    "price": {
                        "currency": "USD",
                        "total": "351.20",
                        "base": "306.00",
                        "fees": [
                            {
                                "amount": "0.00",
                                "type": "SUPPLIER"
                            },
                            {
                                "amount": "0.00",
                                "type": "TICKETING"
                            }
                        ],
                        "grandTotal": "351.20"
                    },
                    "pricingOptions": {
                        "fareType": [
                            "PUBLISHED"
                        ],
                        "includedCheckedBagsOnly": true
                    },
                    "validatingAirlineCodes": [
                        "6X"
                    ],
                    "travelerPricings": [
                        {
                            "travelerId": "1",
                            "fareOption": "STANDARD",
                            "travelerType": "ADULT",
                            "price": {
                                "currency": "USD",
                                "total": "351.20",
                                "base": "306.00"
                            },
                            "fareDetailsBySegment": [
                                {
                                    "segmentId": "1",
                                    "cabin": "ECONOMY",
                                    "fareBasis": "J6XQSMIX",
                                    "class": "Y",
                                    "includedCheckedBags": {
                                        "quantity": 8
                                    }
                                },
                                {
                                    "segmentId": "2",
                                    "cabin": "BUSINESS",
                                    "fareBasis": "J6XQSMIX",
                                    "class": "J",
                                    "includedCheckedBags": {
                                        "quantity": 8
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "flight-offer",
                    "id": "2",
                    "source": "GDS",
                    "instantTicketingRequired": false,
                    "nonHomogeneous": false,
                    "oneWay": false,
                    "lastTicketingDate": "2024-02-10",
                    "lastTicketingDateTime": "2024-02-10",
                    "numberOfBookableSeats": 9,
                    "itineraries": [
                        {
                            "duration": "PT17H",
                            "segments": [
                                {
                                    "departure": {
                                        "iataCode": "JFK",
                                        "at": "2024-02-10T14:00:00"
                                    },
                                    "arrival": {
                                        "iataCode": "LHR",
                                        "at": "2024-02-10T22:00:00"
                                    },
                                    "carrierCode": "6X",
                                    "number": "84",
                                    "aircraft": {
                                        "code": "744"
                                    },
                                    "operating": {
                                        "carrierCode": "6X"
                                    },
                                    "duration": "PT3H",
                                    "id": "3",
                                    "numberOfStops": 0,
                                    "blacklistedInEU": false
                                },
                                {
                                    "departure": {
                                        "iataCode": "LHR",
                                        "at": "2024-02-11T10:30:00"
                                    },
                                    "arrival": {
                                        "iataCode": "MAD",
                                        "at": "2024-02-11T13:00:00"
                                    },
                                    "carrierCode": "6X",
                                    "number": "9931",
                                    "aircraft": {
                                        "code": "320"
                                    },
                                    "operating": {
                                        "carrierCode": "6X"
                                    },
                                    "duration": "PT1H30M",
                                    "id": "4",
                                    "numberOfStops": 0,
                                    "blacklistedInEU": false
                                }
                            ]
                        }
                    ],
                    "price": {
                        "currency": "USD",
                        "total": "351.20",
                        "base": "306.00",
                        "fees": [
                            {
                                "amount": "0.00",
                                "type": "SUPPLIER"
                            },
                            {
                                "amount": "0.00",
                                "type": "TICKETING"
                            }
                        ],
                        "grandTotal": "351.20"
                    },
                    "pricingOptions": {
                        "fareType": [
                            "PUBLISHED"
                        ],
                        "includedCheckedBagsOnly": true
                    },
                    "validatingAirlineCodes": [
                        "6X"
                    ],
                    "travelerPricings": [
                        {
                            "travelerId": "1",
                            "fareOption": "STANDARD",
                            "travelerType": "ADULT",
                            "price": {
                                "currency": "USD",
                                "total": "351.20",
                                "base": "306.00"
                            },
                            "fareDetailsBySegment": [
                                {
                                    "segmentId": "3",
                                    "cabin": "ECONOMY",
                                    "fareBasis": "J6XQSMIX",
                                    "class": "Y",
                                    "includedCheckedBags": {
                                        "quantity": 8
                                    }
                                },
                                {
                                    "segmentId": "4",
                                    "cabin": "BUSINESS",
                                    "fareBasis": "J6XQSMIX",
                                    "class": "J",
                                    "includedCheckedBags": {
                                        "quantity": 8
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "flight-offer",
                    "id": "3",
                    "source": "GDS",
                    "instantTicketingRequired": false,
                    "nonHomogeneous": false,
                    "oneWay": false,
                    "lastTicketingDate": "2024-02-03",
                    "lastTicketingDateTime": "2024-02-03",
                    "numberOfBookableSeats": 9,
                    "itineraries": [
                        {
                            "duration": "PT15H25M",
                            "segments": [
                                {
                                    "departure": {
                                        "iataCode": "JFK",
                                        "terminal": "1",
                                        "at": "2024-02-10T13:00:00"
                                    },
                                    "arrival": {
                                        "iataCode": "IST",
                                        "at": "2024-02-11T06:50:00"
                                    },
                                    "carrierCode": "TK",
                                    "number": "4",
                                    "aircraft": {
                                        "code": "333"
                                    },
                                    "operating": {
                                        "carrierCode": "TK"
                                    },
                                    "duration": "PT9H50M",
                                    "id": "13",
                                    "numberOfStops": 0,
                                    "blacklistedInEU": false
                                },
                                {
                                    "departure": {
                                        "iataCode": "IST",
                                        "at": "2024-02-11T07:55:00"
                                    },
                                    "arrival": {
                                        "iataCode": "MAD",
                                        "terminal": "1",
                                        "at": "2024-02-11T10:25:00"
                                    },
                                    "carrierCode": "TK",
                                    "number": "1857",
                                    "aircraft": {
                                        "code": "333"
                                    },
                                    "operating": {
                                        "carrierCode": "TK"
                                    },
                                    "duration": "PT4H30M",
                                    "id": "14",
                                    "numberOfStops": 0,
                                    "blacklistedInEU": false
                                }
                            ]
                        }
                    ],
                    "price": {
                        "currency": "USD",
                        "total": "456.30",
                        "base": "187.00",
                        "fees": [
                            {
                                "amount": "0.00",
                                "type": "SUPPLIER"
                            },
                            {
                                "amount": "0.00",
                                "type": "TICKETING"
                            }
                        ],
                        "grandTotal": "456.30"
                    },
                    "pricingOptions": {
                        "fareType": [
                            "PUBLISHED"
                        ],
                        "includedCheckedBagsOnly": true
                    },
                    "validatingAirlineCodes": [
                        "TK"
                    ],
                    "travelerPricings": [
                        {
                            "travelerId": "1",
                            "fareOption": "STANDARD",
                            "travelerType": "ADULT",
                            "price": {
                                "currency": "USD",
                                "total": "456.30",
                                "base": "187.00"
                            },
                            "fareDetailsBySegment": [
                                {
                                    "segmentId": "13",
                                    "cabin": "ECONOMY",
                                    "fareBasis": "PV3PXOW",
                                    "brandedFare": "RS",
                                    "brandedFareLabel": "RESTRICTED",
                                    "class": "P",
                                    "includedCheckedBags": {
                                        "quantity": 2
                                    },
                                    "amenities": [
                                        {
                                            "description": "1 PIECE X 8 KG CABIN BAGGAGE",
                                            "isChargeable": false,
                                            "amenityType": "BAGGAGE",
                                            "amenityProvider": {
                                                "name": "BrandedFare"
                                            }
                                        },
                                        {
                                            "description": "BAG INCLUDED",
                                            "isChargeable": false,
                                            "amenityType": "BAGGAGE",
                                            "amenityProvider": {
                                                "name": "BrandedFare"
                                            }
                                        },
                                        {
                                            "description": "MEAL SERVICE",
                                            "isChargeable": false,
                                            "amenityType": "MEAL",
                                            "amenityProvider": {
                                                "name": "BrandedFare"
                                            }
                                        },
                                        {
                                            "description": "STANDART SEAT SELECTION",
                                            "isChargeable": true,
                                            "amenityType": "BRANDED_FARES",
                                            "amenityProvider": {
                                                "name": "BrandedFare"
                                            }
                                        },
                                        {
                                            "description": "REFUNDABLE TICKET",
                                            "isChargeable": true,
                                            "amenityType": "BRANDED_FARES",
                                            "amenityProvider": {
                                                "name": "BrandedFare"
                                            }
                                        },
                                        {
                                            "description": "CHANGEABLE TICKET",
                                            "isChargeable": true,
                                            "amenityType": "BRANDED_FARES",
                                            "amenityProvider": {
                                                "name": "BrandedFare"
                                            }
                                        },
                                        {
                                            "description": "ONLINE MESSAGE RIGHT",
                                            "isChargeable": false,
                                            "amenityType": "ENTERTAINMENT",
                                            "amenityProvider": {
                                                "name": "BrandedFare"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "segmentId": "14",
                                    "cabin": "ECONOMY",
                                    "fareBasis": "PV3PXOW",
                                    "brandedFare": "RS",
                                    "brandedFareLabel": "RESTRICTED",
                                    "class": "P",
                                    "includedCheckedBags": {
                                        "quantity": 2
                                    },
                                    "amenities": [
                                        {
                                            "description": "1 PIECE X 8 KG CABIN BAGGAGE",
                                            "isChargeable": false,
                                            "amenityType": "BAGGAGE",
                                            "amenityProvider": {
                                                "name": "BrandedFare"
                                            }
                                        },
                                        {
                                            "description": "BAG INCLUDED",
                                            "isChargeable": false,
                                            "amenityType": "BAGGAGE",
                                            "amenityProvider": {
                                                "name": "BrandedFare"
                                            }
                                        },
                                        {
                                            "description": "MEAL SERVICE",
                                            "isChargeable": false,
                                            "amenityType": "MEAL",
                                            "amenityProvider": {
                                                "name": "BrandedFare"
                                            }
                                        },
                                        {
                                            "description": "STANDART SEAT SELECTION",
                                            "isChargeable": true,
                                            "amenityType": "BRANDED_FARES",
                                            "amenityProvider": {
                                                "name": "BrandedFare"
                                            }
                                        },
                                        {
                                            "description": "REFUNDABLE TICKET",
                                            "isChargeable": true,
                                            "amenityType": "BRANDED_FARES",
                                            "amenityProvider": {
                                                "name": "BrandedFare"
                                            }
                                        },
                                        {
                                            "description": "CHANGEABLE TICKET",
                                            "isChargeable": true,
                                            "amenityType": "BRANDED_FARES",
                                            "amenityProvider": {
                                                "name": "BrandedFare"
                                            }
                                        },
                                        {
                                            "description": "ONLINE MESSAGE RIGHT",
                                            "isChargeable": false,
                                            "amenityType": "ENTERTAINMENT",
                                            "amenityProvider": {
                                                "name": "BrandedFare"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
        ]
            }; 
            setFlightData(mockApiResponse);
        };

        fetchData();
    }, []);

    return (
        <div className="flights-container">
            <div className="search-bar-container">
                <SearchBar />
            </div>
            <div className="content-container">
                <div className="filters-container">
                    <Filters /> 
                </div>
                <div className="flight-offers-container">
                    {flightData && flightData.data.map(offer => (
                        <FlightOffer key={offer.id} offer={offer} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Flights;
