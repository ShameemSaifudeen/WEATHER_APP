import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import weatherRoutes from "./routes/weather.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://0.0.0.0:27017/weather-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});

// Routes
app.use("/api/weather", weatherRoutes);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
