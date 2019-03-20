const config = require('./config/config').get(process.env.NODE_ENV);
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

//DB Connection
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(config.DATABASE, { useNewUrlParser: true });

//Models
const User = require('./models/user');
const Book = require('./models/book');

//ROUTING
const BASE_URL = `/api/${config.version}`;

//GET
app.get(`${BASE_URL}/book`, (req, res) => {
  let id = req.query.id;

  Book.findById(id, (err,doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });
});

app.get(`${BASE_URL}/books`, (req, res) => {

  //localhost:3001/api/v1/books?skip=3&limit=2&order=asc
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  //Order = asc || desc
  Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err, doc)=>{
    if (err) return res.status(400).send(err);
    res.send(doc);

  });

});

//POST
app.post(`${BASE_URL}/book`, (req, res) => {


  const book = new Book(req.body);

  book.save((err, doc) => {

    if (err) return res.status(400).send(err);
    res.status(200).json({
      post: true,
      bookId: doc._id,

    });

  });
});




const port = process.env.PORT || 3001;

app.listen(port, () => {

  console.log(`Server Listen on http://localhost:${port}${BASE_URL}`);

});