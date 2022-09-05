const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express()

const userRoutes = require('./routes/user')

mongoose.connect(process.env.DB_AUTH, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connect to DB"))
.catch(() => console.log("Failed to connect to DB"))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(express.json());

app.use('/api/user', userRoutes)

module.exports = app;