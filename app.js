const express = require('express');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const strategy = require('./authentication/strategy');
const router = require('./routes/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(strategy);

app.use('/', router);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Express App listening on port ${PORT}`));