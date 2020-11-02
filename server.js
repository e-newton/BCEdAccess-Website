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


app.post("/blogs", async (req,res) => {
  let query = 'INSERT INTO website.blogs(id, author, body, title) VALUES ($1, $2, $3, $4)';
  let values = [req.body.id, req.body.author, req.body.body, req.body.title];
  let d = await client.query(query ,values);
  res.json({success:d.rowCount>0});
});
//TODO FINISH
app.put('/blogs', async (req,res) => {
  let query = 'UPDATE website.blogs SET author = $1, body = $2, title = $3 WHERE id = $4';
  let values = [req.body.author, req.body.body, req.body.title, req.body.id];
  let d = await client.query(query ,values);
  res.json({success:d.rowCount>0});
});



// app.get('blogs/:id', async(req, res) => {
//   let id = req.params.id;
//   let d = await client.query(`SELECT * FROM website.blogs WHERE id=${id}`)
// });
 //TODO: Get both endpoints working separately.
app.get("/blogs", async (req,res) => {
  const data = [];
  if(req.query.id){
    if (String(req.query.id).match(/[^0-9]/)) {
      res.status(404);
      return;
      }
    let d = await client.query(`SELECT * FROM website.blogs WHERE id=${req.query.id}`)
    if(d.length === 0) {
      res.status(404);
      return;
    }
    d.rows.forEach(row => {
      data.push({id: row.id, title:row.title, author:row.author, body:row.body})
    })
    res.json(data);
  } else{
    let d = await client.query('SELECT * FROM website.blogs ORDER BY id ASC')
    d.rows.forEach(row => {
      data.push({id: row.id, title:row.title, author:row.author, body:row.body})
    })
    res.json(data)
  }

})








// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
