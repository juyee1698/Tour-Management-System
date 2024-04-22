import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, CardText, Table } from 'reactstrap';
import ItineraryModal from './ItineraryModal';
import { getItineraries, deleteItinerary, deleteItinerarySegment } from "../apiService";
import { useNavigate } from 'react-router-dom';
import "../styles/Itinerary.css";

function Itinerary() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [itineraries, setItineraries] = useState([]);

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    fetchItineraries();
  }, []);

  async function fetchItineraries() {
    try {
      const itineraryData = await getItineraries();
      setItineraries(itineraryData.itineraries);
    } catch (error) {
      if (error.authError) {
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        console.error('Failed to fetch itineraries:', error);
      }
    }
  }

  async function handleItineraryCreated() {
    fetchItineraries();
  }

  async function handleDeleteItinerary(id) {
    try {
      console.log(id)
      await deleteItinerary({ itineraryId: id });
      fetchItineraries();
    } catch (error) {
      console.error('Failed to delete itinerary:', error);
    }
  }

  async function handleDeleteSegment(itineraryId, segmentId, segmentDate) {
    console.log(itineraryId)
    const delData = {
        "itineraryId":itineraryId,
        "segmentPlaceId":segmentId,
        "segmentDate":segmentDate
    }
    
    try {
      const d = await deleteItinerarySegment(delData); 
      console.log(d)
      fetchItineraries(); 
    } catch (error) {
      console.error('Failed to delete segment:', error);
    }
  }

  return (
    <div className="itinerary-container">
      <div className="button-container">
        <Button color="primary" onClick={toggleModal}>Create Itinerary</Button>
      </div>
      <ItineraryModal isOpen={modal} toggle={toggleModal} onItineraryCreated={handleItineraryCreated} />
      
      {itineraries.map((itinerary) => (
        <Card key={itinerary._id} className="itinerary-card">
          <CardBody>
            <CardTitle tag="h5">{itinerary.name}</CardTitle>
            <CardText>{itinerary.description}</CardText>
            <CardText>
              <small className="text-muted">
                From {new Date(itinerary.startDate).toLocaleDateString()} to {new Date(itinerary.endDate).toLocaleDateString()}
              </small>
            </CardText>
            <Table striped>
              <thead>
                <tr>
                  <th>Segments</th>
                </tr>
              </thead>
              <tbody>
                {itinerary.itinerarySegments.map((segment, index) => (
                  <tr key={segment._id}>
                    <td>
                      {segment.placeName} at {segment.placeAddress} on {new Date(segment.date).toLocaleDateString()}
                      <Button color="danger" size="sm" className="float-right" onClick={() => handleDeleteSegment(itinerary._id, segment.placeId, segment.date)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button color="danger" onClick={() => handleDeleteItinerary(itinerary._id)}>Delete Itinerary</Button>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default Itinerary;
