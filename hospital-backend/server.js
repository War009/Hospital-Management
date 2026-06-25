const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const appointmentRoutes = require("./routes/appointments");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb+srv://Warda:12345@cluster0.cpezv.mongodb.net/Hospital?retryWrites=true&w=majority";

// Connect to MongoDB 
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => console.log("DB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);

// Start server AFTER routes are defined
app.listen(5000, () => console.log("Server running on port 5000"));


