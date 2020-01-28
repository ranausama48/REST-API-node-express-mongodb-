const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const db = require("./config/db");

//Databse Connection
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(err => {
    console.log("Unable to connect with database");
  });

//Defining the port
const port = process.env.PORT || 5000;

//intialize cors Middleware
app.use(cors());

//initiallize BodyParser Midleware
app.use(bodyParser.json());

const Routes = require("./routes/apis/routes");
app.use("/api/project", Routes);
app.listen(port, () => {
  console.log("Server is Started on Port", port);
});
