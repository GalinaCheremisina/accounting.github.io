const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/user");
const billRoutes = require("./routes/bill");
const categoryRoutes = require("./routes/category");
const eventRoutes = require("./routes/events");

const app = express();

mongoose
  .connect(
    "mongodb+srv://user:"+ process.env.MONGO_ATLAS_PW +"@cluster0-oi4sl.mongodb.net/accounting",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
  
  app.use("/api/bill", billRoutes);
  app.use("/api/user", usersRoutes);
  app.use("/api/category", categoryRoutes);
  app.use("/api/event", eventRoutes);
  
  module.exports = app;