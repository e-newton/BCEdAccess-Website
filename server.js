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

const client = new Client({database:'bcedaccess'});
client.connect( err => {
  if (err) {
    console.error('connection error', err.stack)
    console.error('Eric did you remember to turn the stupid thing on?')
  } else {
    console.log('connected to database')
  }
});

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

app.get('blogs/:id', async(req,res) => {
  let id = req.params.id;
  let d = await client.query(`SELECT * FROM website.blogs WHERE id=${id}`)
})

app.get("/blogs", async (req,res) => {
  if(req.query.id){
    let d = await client.query(`SELECT * FROM website.blogs WHERE id=${id}`)
    d.rows.forEach(row => {
      data.push({title:row.title, author:row.author, body:row.body})
    })
    res.json(data);
    return;
  } else{
    let d = await client.query('SELECT * FROM website.blogs')
    const data = [];
    d.rows.forEach(row => {
      data.push({title:row.title, author:row.author, body:row.body})
    })
    res.json(data)
  }

})








// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
