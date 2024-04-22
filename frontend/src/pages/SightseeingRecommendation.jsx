import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Container, Grid, CardMedia } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import axios from 'axios';
import { CardImg, Button} from 'reactstrap';
const App = () => {
  const [placeLogs, setPlaceLogs] = useState([]);

  useEffect(() => {
    const fetchImages = async (logs) => {
      const updatedLogs = await Promise.all(logs.map(async log => {
        console.log(log.placePhotoReference)
        console.log(process.env.REACT_APP_PLACES_NEARBY)
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${log.placePhotoReference}&key=${process.env.REACT_APP_PLACES_NEARBY}`;
        console.log(photoUrl)
        try {
          const response = await axios.get(photoUrl, { responseType: 'blob' });
          log.photoUrl = URL.createObjectURL(response.data);
        } catch (error) {
          console.error('Error fetching place photo:', error);
          log.photoUrl = '/path_to_default_image.jpg'; // fallback image path in case of an error
        }
        return log;
      }));
      setPlaceLogs(updatedLogs);
    };

    const storedLogs = JSON.parse(localStorage.getItem('activity'));
    console.log(storedLogs)
    if (storedLogs && storedLogs.length > 0) {
      fetchImages(storedLogs);
    }
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Recently searched
      </Typography>
      <Grid container spacing={2}>
        {placeLogs.length > 0 ? (
          placeLogs.map((log, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card variant="outlined">
              <CardImg top src={`https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${log.placePhotoReference}&key=${process.env.REACT_APP_PLACES_NEARBY}`} alt={log.placeNamw} className="tour__img" />
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    <PlaceIcon color="primary" /> {log.placeName}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {log.placeAddress}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="subtitle1">No detailed place logs available.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default App;
