const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require('./config/keys');
const users = require("./routes/api/users");
const students = require('./routes/api/students');

require('dotenv').config();

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const db = config.mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);

app.use("/api/users/students", passport.authenticate('jwt', {session: false}), students)

app.listen(config.port, () => console.log(`Server up and running on port ${config.port} !`));