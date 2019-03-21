const config = require('../config/config').get(process.env.NODE_ENV);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_I = 10;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minLength: 5
  },
  name: {
    type: String,
    minLength: 5,
    maxLength: 100
  },
  lastName: {
    type: String,
    minLength: 5,
    maxLength: 100
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});


userSchema.pre('save', function(next){

  let user = this;

  if(user.isModified('password')) {
    bcrypt.genSalt(SALT_I, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash){
        if(err) return next(err);
        user.password = hash;
        next();
      });
    });
  }
  else {
    next();
  }
  
});

userSchema.methods.comparePassword = function(candidatePassword, callBack){

  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err) return callBack(err);
    callBack(null, isMatch);
  });

};

userSchema.methods.generateToken = function(callBack){
  let user = this;
  let token = jwt.sign(user._id.toHexString(), config.SECRET);
  user.token = token;
  user.save(function(err, user) {
    if(err) return callBack(err);
    callBack(null, user);
  });
};

const User = mongoose.model('User', userSchema);
module.exports = { User };
