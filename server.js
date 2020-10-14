const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const process = require('process')
const { Client } = require('pg');
const path = require('path');

require('dotenv').config()

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

if (!(process.env.PRODUCTION === 0)) {
  console.log("DEVELOPMENT")
  app.use(express.static('./src/'))
  app.get('./*', function (req, res) {
    res.sendFile(path.join('src/index.html'));
  });

} else {
  console.log("PRODUCTION")
  app.use(express.static(__dirname + '/dist/BCEdAccess-Website'));

  app.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/dist/BCEdAccess-Website/index.html'));
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get("/blogs", (req,res) => {
  const b1 = {title: 'I AM BUILT IN', author: 'ERIC NEWTON', body: 'holla'}
  const data = [b1];
  res.json(data)
})


const client = new Client();
client.connect( err => {
  if (err) {
    console.error('connection error', err.stack)
    console.error('Eric did you remember to turn the stupid thing on?')
  } else {
    console.log('connected to database')
  }
});





// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
