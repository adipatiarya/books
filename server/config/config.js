const VERSION = 'v1';

const config = {
  production: {
    version: VERSION,
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI
  },

  default: {
    version: VERSION,
    SECRET: '123456',
    DATABASE: 'mongodb://localhost:27017/books_shelf'
  }
};

exports.get = function get(env) {
  return config[env] || config.default
};