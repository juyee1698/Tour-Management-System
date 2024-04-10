import React, { useState, useEffect } from 'react';
import { userBookingHistory } from '../apiService';
import '../styles/booking-history.css';
import { useNavigate } from 'react-router-dom';

const BookingHistory = () => {
    const navigate = useNavigate();
    const [userData, setBookingHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookingHistory = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await userBookingHistory();
                setBookingHistory(data.bookingInfo || []);
            } catch (error) {
                if (error.authError) {
    
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                }
                else{
                console.error('Search failed:', error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookingHistory();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="booking-history">
            <h2>Flight Booking History</h2>
            {userData.length ? userData.map((booking) => (
                <div key={booking.bookingId} className="booking-card">
                    <h3>Booking ID: {booking.bookingId}</h3>
                    <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {booking.bookingStatus}</p>
                    <p><strong>From:</strong> {booking.originCityName} ({booking.originAirportName})</p>
                    <p><strong>To:</strong> {booking.destinationCityName} ({booking.destinationAirportName})</p>
                    <p><strong>Price:</strong> {booking.currency}{booking.price.total}</p>
                    <div className="travel-segments">
                        <h4>Travel Segments:</h4>
                        {booking.destinationTravelSegments.map((segment, index) => (
                            <div key={index}>
                                <p><strong>Departure:</strong> {new Date(segment.departure.at).toLocaleString()}</p>
                                <p><strong>Arrival:</strong> {new Date(segment.arrival.at).toLocaleString()}</p>
                                <p><strong>Airline:</strong> {segment.airline}</p>
                                <p><strong>Duration:</strong> {segment.duration}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )) : <p>No booking history found.</p>}
        </div>
    );
};

export default BookingHistory;
