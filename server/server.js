const config = require('./config/config').get(process.env.NODE_ENV);
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();

//DB Connection
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(config.DATABASE, { useNewUrlParser: true });

//user Models
const { User } = require('./models/user');

//Book Models
const { Book } = require('./models/book');


app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 3001;

app.listen(port, () => {

  console.log(`Server running on ${port}`);

});