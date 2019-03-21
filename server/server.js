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

const { User } = require('./models/user');
const { Book } = require('./models/book');
const { auth } = require('./middleware/auth');

const BASE_URL = `/api/${config.version}`;

//AUTH
app.post(`${BASE_URL}/login`, (req, res) => {
  //localhost:3001/api/v1/login
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.json({ isAuth: false, message: 'Email wrong!!' });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({ isAuth: false, message: err });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('auth', user.token).json({
          isAuth: true, id: user._id, email: user.email
        });
      });
    });
  });

});

app.get(`${BASE_URL}/logout`, auth, (req, res) => {
  //localhost:3001/api/v1/logout
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return req.status(400).send(err);
    res.sendStatus(200);
  });
});

app.post(`${BASE_URL}/register`, (req, res) => {
  //localhost:3001/api/v1/register
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, doc });
    return res.status(200).json({
      success: true,
      user: doc
    })
  });

});
app.get(`${BASE_URL}/user`, auth, (req, res) => {
  //localhost:3001/api/v1/user
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    lastName: req.user.lastName
  });
});

//GET
app.get(`${BASE_URL}/books`, (req, res) => {
  //localhost:3001/api/v1/books?skip=3&limit=2&order=asc
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  //order = asc || desc
  Book.find().skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });

});

app.get(`${BASE_URL}/book`, (req, res) => {
  let id = req.query.id;
  Book.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });
});

app.get(`${BASE_URL}/book/review`, (req, res) => {
  //localhost:3001/api/v1/book/review?id=123232
  let id = req.query.id;
  User.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({ name: doc.name, lastname: doc.lastname });
  });

});

app.get(`${BASE_URL}/users`, (req, res) => {
  //localhost:3001/api/v1/users
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;
  //order = asc || desc
  User.find({}).skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });
});

app.get(`${BASE_URL}/user/books`, (req, res) => {
  //localhost:3001/api/v1/users/books?user=5c935ffcb861ea3de76ba19d&skip=3&limit=2&order=asc
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  Book.find({ ownerId: req.query.user }).skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
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

//UPDATE
app.put(`${BASE_URL}/book`, (req, res) => {

  //http://localhost:3001/api/v1/books?id=5c92c3a98d93094773d7a797
  let id = req.query.id;
  Book.findOneAndUpdate(id, req.body, (err, doc) => {
    if (err) return res.status(400).send(err);
    return res.json({ success: true, doc: doc })
  });
});

//DELETE
app.delete(`${BASE_URL}/book`, (req, res) => {

  //http://localhost:3001/api/v1/books?id=5c92c3a98d93094773d7a797
  let id = req.query.id;
  Book.findOneAndDelete(id, req.body, (err, doc) => {
    if (err) return res.status(400).send(err);
    return res.json(true);
  });
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server Listen on http://localhost:${port}${BASE_URL}`);
});
