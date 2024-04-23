import React, {useState, useEffect} from 'react';
import '../styles/booking-checkout.css';
import { useLocation, useNavigate } from 'react-router-dom';
import {bookCheckout, logoutUser} from '../apiService';

const BookingCheckout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { flightDetails } = location.state;
    const { flightItinerary, flightPrice, travelerInfo, dictionaries, airportMetadata } = flightDetails;

    // States for form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [postal, setPostal] = useState('');
    const [phoneno, setPhoneno] = useState('');

    // Set journeyContinuationId from flightDetails
    const [journeyContinuationId, setJourneyContinuationId] = useState('');

    useEffect(() => {
        if (flightDetails.journeyContinuationId) {
            setJourneyContinuationId(flightDetails.journeyContinuationId);
        }
    }, [flightDetails.journeyContinuationId]);

    const formatTime = (dateTime) => new Date(dateTime).toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    const formatDuration = (duration) => {
        const parts = duration.match(/(\d+)/g);
        return `${parts[0]}h ${parts[1]}m`;
    };

    const getAirportFullName = (iataCode) => {
        const airport = airportMetadata.find(airport => airport.iataCode === iataCode);
        return airport ? `${airport.cityName}, ${airport.countryName}` : iataCode;
    };

    const getAirlineFullName = (carrierCode) => {
        return dictionaries.carriers[carrierCode] || carrierCode;
    };

    const getAircraftFullName = (code) => {
        return dictionaries.aircraft[code] || code;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            journeyContinuationId,
            userBookingInfo: {
                name,
                email,
                address,
                city,
                state,
                country,
                postal,
                phoneno,
            },
        };
    
        try {
            const bookingResponse = await bookCheckout(payload);
            if(bookingResponse.journeyContinuationId){
                localStorage.setItem('journeyContId',bookingResponse.journeyContinuationId)
            }
            if(bookingResponse.userBookingId){
                localStorage.setItem('bookingUserId',bookingResponse.userBookingId)
            }
            
            console.log(bookingResponse);
            if(bookingResponse.sessionUrl){
                setTimeout(() => {
                    window.location.replace(bookingResponse.sessionUrl)
                }, 1000);
            }
            
          }
          catch (error) {
            if (error.authError) {
                logoutUser();
      
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
            else{
            console.error('Booking Checkout failed:', error);
            }
        }
        
    }


  
    return (
      <div className="booking-checkout">
        <h1>Flight Checkout</h1>
  
        <section className="flight-details">
          <h2>Flight Details</h2>
          {flightItinerary.map((itinerary, index) => (
            <div key={index} className="itinerary">
              <h3>Itinerary {index + 1}</h3>
              <p><strong>Duration:</strong> {formatDuration(itinerary.duration)}</p>
              {itinerary.segments.map((segment, segIndex) => (
                <div key={segIndex} className="segment">
                  <h4>Segment {segIndex + 1}</h4>
                  <ul>
                    <li><strong>Flight:</strong> {getAirlineFullName(segment.carrierCode)} {segment.number}</li>
                    <li><strong>Departure:</strong> {getAirportFullName(segment.departure.iataCode)}, {formatTime(segment.departure.at)}</li>
                    <li><strong>Arrival:</strong> {getAirportFullName(segment.arrival.iataCode)}, {formatTime(segment.arrival.at)}</li>
                    <li><strong>Aircraft:</strong> {getAircraftFullName(segment.aircraft.code)}</li>
                    <li><strong>Stops:</strong> {segment.numberOfStops}</li>
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </section>
  
        <section className="price-details">
          <h2>Price Details</h2>
          <p><strong>Total Price:</strong> {flightPrice.currency} {flightPrice.total}</p>
          <p><strong>Base Price:</strong> {flightPrice.currency} {flightPrice.base}</p>
          <p><strong>Taxes:</strong> {flightPrice.currency} {flightPrice.taxes}</p>
        </section>
  
        <section className="traveler-info">
          <h2>Traveler Information</h2>
          <p>Adults: {travelerInfo.adults}, Children: {travelerInfo.children}, Infants: {travelerInfo.infants}</p>
        </section>
    
        <div className="booking-checkout">
            <h1>Flight Checkout</h1>
            {/* Flight Details Section */}
            <form className="checkout-form" onSubmit={handleSubmit}>
                <input type="text" id="name" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" id="address" name="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                <input type="text" id="city" name="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                <input type="text" id="state" name="state" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
                <input type="text" id="country" name="country" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                <input type="text" id="postal" name="postal" placeholder="Postal Code" value={postal} onChange={(e) => setPostal(e.target.value)} required />
                <input type="text" id="phoneno" name="phoneno" placeholder="Phone Number" value={phoneno} onChange={(e) => setPhoneno(e.target.value)} required />
                <button type="submit">Confirm Booking</button>
            </form>
        </div>
    </div>
  );
};

export default BookingCheckout;
