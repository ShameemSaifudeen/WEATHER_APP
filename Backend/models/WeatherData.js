import mongoose from "mongoose";

const weatherDataSchema = new mongoose.Schema({
  location: String,
  temperature: Number,
  description: String,
});

const WeatherData = mongoose.model("WeatherData", weatherDataSchema);

export default WeatherData;
