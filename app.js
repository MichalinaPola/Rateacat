const express = require('express');
const request = require('request');
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

app.post('/sign-up', (req, res) => {
    const { email } = req.body;
    // Database part 
    client.connect()
    client.query("SELECT * FROM subscriptions WHERE email = $1", [email], (err, response) => {
            if (err) {
              console.log(err.stack)
              client.end(); 
            } else {
              if (response.rows.length === 0) {
                client.query("INSERT INTO subscriptions (email) VALUES ($1)", [email])
                .then(() => client.end())
                res.sendStatus(200);
                } else {
                client.end();
                res.sendStatus(400);
                } 
            }
          })
});

