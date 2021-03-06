const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Client } = require('pg')

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Server is started'));

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Rateacat',
    password: 'postgres',
    port: 5432,
})
client.connect()

// Handling the newsletter sign-up
app.post('/sign-up', (req, res) => {
    const { email } = req.body;
    client.query("SELECT * FROM subscriptions WHERE email = $1", [email], (err, response) => {
            if (err) {
              console.log(err)
            } else {
              if (response.rows.length === 0) {
                client.query("INSERT INTO subscriptions (email) VALUES ($1)", [email])
                  .then(() => res.sendStatus(200))
                  .catch(err => {
                    console.log(err);
                    res.sendStatus(500);
                  })
                } else {
                res.sendStatus(409);
                } 
            }
          })
});

// Adding a new review to the database
app.post('/new-review', (req, res) => {
  client.query("INSERT INTO reviews(name, colour, age, gender, summary, sstars, pstars, cstars, astars, hstars, overall, body) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);", [req.body.name, req.body.colour, req.body.age, req.body.gender, req.body.summary, req.body.sstars, req.body.pstars, req.body.cstars, req.body.astars, req.body.hstars, req.body.overall, req.body.revbody], (err) => {
    if (err) {
      console.log(err)
    } else {
        res.sendStatus(200)
    }
  })
});

// Getting a random review from the database
app.get('/random-review', (req, res) => {
  client.query("SELECT * FROM reviews ORDER BY random() limit 1;", (err, response) => {
    if (err) {
      console.log(err);
    } else {
        res.status(200).send(response.rows)
    }
  })
});

// Searching through reviews
app.post('/search-reviews', (req, res) => {
  const passedColour = req.body.colour;
  const passedAge = req.body.age;
  const passedGender = req.body.gender;
  const passedRating = req.body.rating;
  client.query("SELECT * FROM reviews WHERE colour LIKE $1 AND age LIKE $2 AND gender LIKE $3 AND overall >= $4", [passedColour, passedAge, passedGender, passedRating], (err, response) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(response.rows)
    }
  })
});