import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookCancel } from '../apiService';



const BookingCancelComponent = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const performCancellation = async () => {
            try {
                const bookingResponse = await bookCancel();
                console.log('Booking cancelled:', bookingResponse);
                navigate('/bookingCheckout', { state: { flightDetails: bookingResponse }});
            } catch (err) {
                console.error('Error cancelling booking:', err);
                setError(err);
                setLoading(false);
            }
        };

        performCancellation();
    }, [navigate]);

    if (loading) {
        return <h1>Processing cancellation...</h1>;
    }

    if (error) {
        return (
            <div className="booking-cancel">
                <h1>Error occurred during cancellation.</h1>
            </div>
        );
    }

    return null;
};

const BookingCancel = React.memo(BookingCancelComponent);

export default BookingCancel;
