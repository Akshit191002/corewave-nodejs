"use strict"
const mongoose = require('mongoose');

const { DB_URL } = require('../config/server.config');

// Connect to MongoDB using Mongoose
mongoose.connect(DB_URL);

// Event listener for connection error
mongoose.connection.on("error", err => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

// Event listener for successful connection
mongoose.connection.on("connected", () => {
  console.log("*** MongoDB connected successfully ***");
});

// Event listener for disconnected
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Event listener for application termination
process.on('SIGINT', () => {
    mongoose.connection.close()
    .then(() => {
      console.log('MongoDB connection disconnected through app termination');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error closing MongoDB connection:', err);
      process.exit(1);
    });
});