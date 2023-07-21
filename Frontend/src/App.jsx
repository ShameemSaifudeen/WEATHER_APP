import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import "./App.css";

const API_URL = "http://localhost:3000/api/weather"; // Replace with your backend URL

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");

  const getWeatherData = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          location: location,
        },
      });

      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: "url('https://source.unsplash.com/random/1600x900')",
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box
          className="app"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 10,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            padding: "20px",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Weather App
          </Typography>
          <Box className="input-container" sx={{ marginBottom: "20px" }}>
            <Typography variant="subtitle1" component="label" sx={{ marginRight: "10px" }}>
              Enter Location:
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{ flex: 1 }}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={getWeatherData}
          >
            Get Weather
          </Button>
          {weatherData && (
            <Box className="weather-info" sx={{ marginTop: "20px", textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>
                {weatherData.location}
              </Typography>
              <Typography variant="body1">Temperature: {weatherData.temperature}°C</Typography>
              <Typography variant="body1">Description: {weatherData.description}</Typography>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default App;
