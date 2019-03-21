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
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(config.DATABASE);


//Models
const { User } = require('./models/user');
const { Book } = require('./models/book');

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

  //order = asc || desc
  Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err, doc)=>{
    if (err) return res.status(400).send(err);
    res.send(doc);
  });

});

//POST

app.post(`${BASE_URL}/book`, (req, res) => {
  
  //localhost:3001/api/v1/book
  
  const book = new Book(req.body);
  book.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      post: true,
      bookId: doc._id,
    });
  });
});

app.post(`${BASE_URL}/register`, (req, res) => {

  //localhost:3001/api/v1/register
  const user = new User(req.body);
  
  user.save((err, doc)=>{
    if(err) return res.json({success:false, doc});
    return res.status(200).json({
      success:true,
      user:doc
    })
  });

});

//UPDATE
app.put(`${BASE_URL}/book`, (req, res)=>{

//http://localhost:3001/api/v1/books?id=5c92c3a98d93094773d7a797
  let id = req.query.id;
  Book.findOneAndUpdate(id, req.body,(err, doc)=>{
    if (err) return res.status(400).send(err);
    return res.json({success:true,doc:doc})
  });
});

//DELETE
app.delete(`${BASE_URL}/book`, (req, res)=>{
  
  //http://localhost:3001/api/v1/books?id=5c92c3a98d93094773d7a797
  
  let id = req.query.id;
  Book.findOneAndDelete(id, req.body, (err, doc)=>{
    if (err) return res.status(400).send(err);
    return res.json(true);
  });

});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server Listen on http://localhost:${port}${BASE_URL}`);
});
