const FlightOffer = ({ offer }) => {
  const formatTime = (dateTime) => new Date(dateTime).toLocaleTimeString([], { timeStyle: 'short', hour12: true });
  const formatDuration = (isoDuration) => {
    // A function to convert ISO duration to a more readable format will be needed
    // For now, we will just return the ISO string
    return isoDuration;
  };

  const handleBooking = () => {
    // Implement your booking logic here
    console.log(`Booking flight with ID: ${offer.id}`);
  };

  return (
    <div className="flight-offer">
      {offer.itineraries.map((itinerary, index) => {
        const departure = itinerary.segments[0].departure;
        const arrival = itinerary.segments[itinerary.segments.length - 1].arrival;
        const duration = formatDuration(itinerary.duration);
        const layovers = itinerary.segments.length - 1;

        return (
          <div key={index} className="flight-segment">
            <div className="flight-times">
              <span className="depart">Depart: {formatTime(departure.at)}</span>
              <span className="arrive">Arrive: {formatTime(arrival.at)}</span>
              <span className="duration">{duration.substring(2)}</span>
            </div>
            <div className="flight-details">
              <span className="airline">{offer.validatingAirlineCodes[0]} Airlines</span>
              <span className="flight-number">Flight {itinerary.segments[0].number}</span>
              <span className="layovers">{layovers > 0 ? `${layovers} layover${layovers > 1 ? 's' : ''}` : 'Non-stop'}</span>
            </div>
            <div className="flight-price">
              <span className="price">Price: {offer.price.currency} {offer.price.total}</span>
            </div>
            <button className="book-button" onClick={handleBooking}>Book</button>
          </div>
        );
      })}
    </div>
  );
};

export default FlightOffer;
