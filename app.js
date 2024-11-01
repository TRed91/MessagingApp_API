const express = require('express');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));



const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Express App listening on port ${PORT}`));