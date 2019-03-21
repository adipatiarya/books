### express-node-api v1.0.0 [![Build Status: Linux](https://travis-ci.org/gruntjs/grunt-contrib-less.svg?branch=master)](https://travis-ci.org/gruntjs/grunt-contrib-less) [![Build Status: Windows](https://ci.appveyor.com/api/projects/status/ho4vr86k30r8un49/branch/master?svg=true)](https://ci.appveyor.com/project/gruntjs/grunt-contrib-less/branch/master)

## Getting Started
If you haven't used [Mongodb](https://docs.mongodb.com) before, be sure to check out the [Getting Started](https://docs.mongodb.com/v3.2/tutorial/v3.2/tutorial/) guide for installation.

```shell
git clone this repo
cd repo
npm install
npm run start
```
## Routing

#GET 

> http://localhost:3001/api/v1/book?id=1212121

> http://localhost:3001/api/v1/books

> http://localhost:3001/api/v1/books?skip=3&limit=2&order=asc

> http://localhost:3001/api/v1/books?skip=3&limit=2&order=desc
{
    method:get
}

#POST

> http://localhost:3001/api/v1/book

{
    "name": "Harry Potter The Explorer",
    "author": "Jk Rowling",
    "ownerId": "Adipati Arya"
}

#UPDATE

> http://localhost:3001/api/v1/book?id=1212121
{
    method:put
}
