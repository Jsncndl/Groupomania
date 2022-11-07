const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path")

const app = express()

const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')

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

/* app.use(express.static('../front/build'))
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, '../front/build/index.html'))
}) */

app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app;