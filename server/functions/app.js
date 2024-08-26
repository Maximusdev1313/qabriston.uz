require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const serverless = require("serverless-http");

const router = express.Router();

const port = process.env.PORT || 5000;
process.env.TZ = "Asia/Tashkent";

app.use(cors({ origin: ['https://razzoq.uz', 'http://localhost:5173', 'https://razzoq.netlify.app', 'http://localhost:5174', 'https://justuz.netlify.app'] }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));


// Database connection
mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log("Database connected");
}).catch(err => console.log(err));

// Routes
router.use('/api/persons', require('../urls/personUrl'));
router.use('/api/user', require('../urls/userUrl'));
router.use('/api/cemetery', require('../urls/cemeteryUrl'));

app.use(`/.netlify/functions/app`, router);

module.exports.handler = serverless(app);
