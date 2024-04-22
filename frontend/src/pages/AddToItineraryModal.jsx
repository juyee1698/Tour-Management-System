import { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { editItinerary } from "../apiService";

const AddToItineraryModal = ({ isOpen, toggle, detailedInfo, itineraries }) => {
    const [selectedItineraryId, setSelectedItineraryId] = useState('');
    const [segmentDate, setSegmentDate] = useState('');

    const handleAddToItinerary = async () => {
        if (!selectedItineraryId || !segmentDate) {
            alert('Please select an itinerary and date.');
            return;
        }

        const data = {
            itineraryId: selectedItineraryId,
            segmentPlaceId: detailedInfo.placeFullDetails.place_id,
            segmentPlaceName: detailedInfo.placeFullDetails.name,
            segmentPlaceAddress: detailedInfo.placeFullDetails.formatted_address,
            segmentDate: segmentDate,
        };

        try {
            const result = await editItinerary(data);
            alert("Place added sucessfully to Itinerary. Check the Itinerary Page")
            toggle();
        } catch (error) {
            console.error('Error adding to itinerary:', error);
            alert("Error:",error)
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add to Itinerary</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="itinerarySelect">Select Itinerary</Label>
                    <Input type="select" id="itinerarySelect" value={selectedItineraryId} onChange={e => setSelectedItineraryId(e.target.value)}>
                        <option value="">Select an Itinerary</option>
                        {itineraries.map(itinerary => (
                            <option key={itinerary._id} value={itinerary._id}>
                                {itinerary.name}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="segmentDate">Select Date</Label>
                    <Input
                        type="date"
                        id="segmentDate"
                        value={segmentDate}
                        onChange={e => setSegmentDate(e.target.value)}
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleAddToItinerary}>Add to Itinerary</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default AddToItineraryModal;