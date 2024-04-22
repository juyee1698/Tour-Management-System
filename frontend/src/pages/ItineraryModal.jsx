import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { createItinerary, getItineraries} from "../apiService";
import { useNavigate } from 'react-router-dom';

function ItineraryModal({ isOpen, toggle, onItineraryCreated }) {
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState({
    itineraryName: '',
    itineraryDescription: '',
    startDate: '',
    endDate: '',
    tags: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
      setItinerary(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
        const itData = await createItinerary(itinerary);
        onItineraryCreated();
        toggle();
    } catch (error) {
        if (error.authError) {
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } else {
            console.error('Search failed:', error);
        }
    }
  };



  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Itinerary</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="itineraryName">Itinerary Name</Label>
            <Input
              type="text"
              name="itineraryName"
              id="itineraryName"
              placeholder="Enter itinerary name"
              value={itinerary.itineraryName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="itineraryDescription">Description</Label>
            <Input
              type="textarea"
              name="itineraryDescription"
              id="itineraryDescription"
              placeholder="Describe your itinerary"
              value={itinerary.itineraryDescription}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="startDate">Start Date</Label>
            <Input
              type="date"
              name="startDate"
              id="startDate"
              value={itinerary.startDate}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="endDate">End Date</Label>
            <Input
              type="date"
              name="endDate"
              id="endDate"
              value={itinerary.endDate}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="tags">Tags</Label>
            <Input
              type="text"
              name="tags"
              id="tags"
              placeholder="architecture, tourist_attractions, cafes, restaurants"
              value={itinerary.tags}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>Save Itinerary</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default ItineraryModal;
