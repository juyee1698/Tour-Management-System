import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import {getFlightDetails} from '../apiService';

const FlightOffer = ({ offer }) => {
  const [flightData, setFlightData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const formatTime = (dateTime) => new Date(dateTime).toLocaleTimeString([], { timeStyle: 'short', hour12: false });

  const formatDuration = (isoDuration) => {
    let hours = parseInt(isoDuration.substring(isoDuration.indexOf("T") + 1, isoDuration.indexOf("H")));
    let minutes = parseInt(isoDuration.substring(isoDuration.indexOf("H") + 1, isoDuration.indexOf("M")));
    if (isNaN(hours)) hours = 0;
    if (isNaN(minutes)) minutes = 0;
    return `${hours}h ${minutes}m`;
  };

  const handleCardClick = async () => {
    try {
      const flightDetails = await getFlightDetails( offer.id );
      console.log(flightDetails)
      setFlightData(flightDetails);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching selected flight details:', error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="flight-offer" onClick={handleCardClick}>
      {offer.itineraries.map((itinerary, index) => {
        const departure = itinerary.segments[0].departure;
        const arrival = itinerary.segments[itinerary.segments.length - 1].arrival;
        const duration = formatDuration(itinerary.duration);
        const layovers = itinerary.segments.length - 1;

        const checkedBags = offer.price.fareDetailsBySegment[0].includedCheckedBags;

        return (
          <div key={index} className="flight-segment">
            <div className="flight-route">
              <span className="from">From: {departure.iataCode}</span>
              <span className="to">To: {arrival.iataCode}</span>
            </div>
            <div className="flight-times">
              <span className="depart">Depart: {formatTime(departure.at)}</span>
              <span className="arrive">Arrive: {formatTime(arrival.at)}</span>
              <span className="duration">{duration}</span>
            </div>
            <div className="flight-details">
              <span className="airline">{offer.validatingAirlineCodes[0]} Airlines</span>
              <span className="flight-number">Flight {itinerary.segments[0].number}</span>
              <span className="layovers">{layovers > 0 ? `${layovers} layover${layovers > 1 ? 's' : ''}` : 'Non-stop'}</span>
            </div>
            <div className="flight-bags">
              <span className="bags">Checked bags: {checkedBags.quantity}</span>
            </div>
            <div className="flight-price">
              <span className="price">Price: {offer.price.currency} {offer.price.total}</span>
            </div>
          </div>
        );
      })}
   {modalVisible && (
  <Modal isOpen={modalVisible} toggle={closeModal} className="flight-modal wide-modal">
    <ModalHeader toggle={closeModal}>Flight Details</ModalHeader>
    <ModalBody>
      {flightData && (
        <div className="flight-details-container">
          <div className="flight-details-main">
            <div className="flight-locations-price">
              <div className="flight-locations">
                <div>
                  <span className="location-label">Departure:</span>
                  <span className="location-value">{flightData.flightInfo.itineraries[0].segments[0]?.departure.iataCode} - {formatTime(flightData.flightInfo.itineraries[0].segments[0]?.departure.at)}</span>
                </div>
                <div>
                  <span className="location-label">Arrival:</span>
                  <span className="location-value">{flightData.flightInfo.itineraries[0].segments[0]?.arrival.iataCode} - {formatTime(flightData.flightInfo.itineraries[0].segments[0]?.arrival.at)}</span>
                </div>
                <div>
                  <span className="location-duration">Duration: {formatDuration(flightData.flightInfo.itineraries[0].duration)}</span>
                  <span className="location-stops">{flightData.flightInfo.itineraries[0].segments[0]?.numberOfStops === 0 ? 'Non-stop' : `${flightData.flightInfo.itineraries[0].segments[0]?.numberOfStops} Stop(s)`}</span>
                </div>
              </div>
              <div className="flight-pricing">
                <span className="price-total">{flightData.flightInfo.price.currency} {flightData.flightInfo.price.total}</span>
                <div className="price-breakdown">
                  <span>Base Fare: {flightData.flightInfo.price.currency} {flightData.flightInfo.price.base}</span>
                  <span>Taxes: {flightData.flightInfo.price.currency} {flightData.flightInfo.price.taxes}</span>
                </div>
              </div>
            </div>
            </div>
            <div className="flight-amenities">
              {flightData.flightInfo.price.fareDetailsBySegment[0].amenities.map((amenity, index) => (
                <div key={index} className={`amenity ${amenity.isChargeable ? 'chargeable' : 'included'}`}>
                  <span className="amenity-description">{amenity.description}</span>
                  <span className="amenity-status">{amenity.isChargeable ? "Chargeable" : "Included"}</span>
                </div>
              ))}
            </div>
          </div>
      )}  
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={closeModal}>Close</Button>
      <Button color="primary">Book This Flight</Button>
    </ModalFooter>
  </Modal>
)}


    </div>
  );
};

export default FlightOffer;
