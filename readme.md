### express-node-api v1.0.0 [![Build Status: Linux](https://travis-ci.org/gruntjs/grunt-contrib-less.svg?branch=master)](https://travis-ci.org/gruntjs/grunt-contrib-less) [![Build Status: Windows](https://ci.appveyor.com/api/projects/status/ho4vr86k30r8un49/branch/master?svg=true)](https://ci.appveyor.com/project/gruntjs/grunt-contrib-less/branch/master)


## Requirement

If you haven't used [Mongodb](https://docs.mongodb.com) before, be sure to check out the [Getting Started](https://docs.mongodb.com/v3.2/tutorial/v3.2/tutorial/) guide for installation.

## Getting Started

```shell

git clone https://github.com/adipatiarya/express-node-api.git 

cd express-node-api

npm install

npm run start

```
## Routing

# AUTH

> POST: http://localhost:3001/api/v1/login

> GET: http://localhost:3001/api/v1/logout

> POST http://localhost:3001/api/v1/register {name, email, password}

> GET http://localhost:3001/api/v1/user


### GET

> http://localhost:3001/api/v1/books

> http://localhost:3001/api/v1/books?skip=3&limit=2&order=<asc, desc>

> http://localhost:3001/api/v1/book?id=1212121

> http://localhost:3001/api/v1/book/review?id=userid

> http://localhost:3001/api/v1/users




### POST

> http://localhost:3001/api/v1/book

{
    "name": "Harry Potter The Explorer",
    "author": "Jk Rowling",
    "ownerId": "Adipati Arya"
}

> http://localhost:3001/api/v1/register

{
	"email":"asas@gmailsaa.com",
	"password":"123456",
	"name":"adipati",
	"lastname":"arya"
}

> http://localhost:3001/api/v1/login

{
    "email":"abcd@gmail.com",
    "password":"123456"
}

### PUT

> http://localhost:3001/api/v1/book?id=1212121

{
    "name": "Harry Potter The Explorer 2",
    "author": "Jk Rowling",
    "ownerId": "Adipati Arya"
}

### DELETE

> http://localhost:3001/api/v1/book?id=1212121
