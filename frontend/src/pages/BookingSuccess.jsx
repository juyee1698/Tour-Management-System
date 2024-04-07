import React, { useState, useEffect } from 'react';
import { bookSuccess } from '../apiService';
import '../styles/booking-success.css';
import car from '../assets/images/car.gif';

const BookingSuccessComponent = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingInfo, setBookingInfo] = useState(null);

    useEffect(() => {
        const fetchBookingSuccess = async () => {
            try {
                const data = await bookSuccess();
                setBookingInfo(data);
                console.log('Booking success:', data);
            } catch (err) {
                console.error('Error booking flight:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingSuccess();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Error occurred during booking.</h1>;
    }

    return (
        <div className="booking-success">
            <img src={car} alt="Booking Success" className="success-gif"/>
            <h1>Flight Booking Successful!</h1>
            <p>Booking ID: {bookingInfo.bookingId}</p>
            <p>You will receive an email with the invoice soon.</p>
        </div>
    );
};

const BookingSuccess = React.memo(BookingSuccessComponent);

export default BookingSuccess;
