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
    .then(() => console.log("Connected to the database"))
    .then(() => client.query("INSERT INTO subscriptions (email) VALUES ($1)", [email]))
    .catch(e => console.log(e))
    .finally(() => client.end());

    res.sendStatus(200)
});

