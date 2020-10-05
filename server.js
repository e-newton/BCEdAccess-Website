const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const process = require('process')
const { Client } = require('pg');

require('dotenv').config()

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

if(process.env.PRODUCTION){
  app.use(express.static(__dirname + '/dist/BCEdAccess-Website'));

  app.get('/*', function(req,res) {

    res.sendFile(path.join(__dirname+'/dist/BCEdAccess-Website/index.html'));
  });
} else{
  app.use(express.static('./src/'))
  app.get('./*', function(req,res) {
    res.sendFile(path.join('src/index.html'));
  });

}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


const client = new Client();
client.connect( err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected to database')
  }
});





// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
