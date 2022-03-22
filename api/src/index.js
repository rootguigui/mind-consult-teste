const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./helpers/conn');
const { routes } =  require('./routes');

const port = process.env.PORT || 80;
const urlDb =  process.env.URL_DB_CONNECTION;

//-- set Properties of request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// -- Connect to database
connectDB(urlDb);

// -- initiate routes
app.use('/api', routes);

app.listen(port, (err) => console.log(`[SERVER] Connected to port ${port}`));