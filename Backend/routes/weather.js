import express from "express";
import axios from "axios";
import WeatherData from "../models/WeatherData.js";

const router = express.Router();
const API_KEY = "3e08ca25e4e94a80a4a113300232007"
router.get("/", async (req, res) => {
  const { location } = req.query;

  try {
    let weatherData = await WeatherData.findOne({ location });

    if (!weatherData) {
        const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&units=metric`
          );

      weatherData = new WeatherData({
        location: response.data.location.name,
        temperature: response.data.current.temp_c,
        description: response.data.current.condition.text,
      });

      await weatherData.save();
    }

    res.json({
      location: weatherData.location,
      temperature: weatherData.temperature,
      description: weatherData.description,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

export default router;
