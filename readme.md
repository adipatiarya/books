Client server Init

#ROUTING

----GET----

http://localhost:3001/api/v1/book?id=1212121

http://localhost:3001/api/v1/books

http://localhost:3001/api/v1/books?skip=3&limit=2&order=asc

http://localhost:3001/api/v1/books?skip=3&limit=2&order=desc


---POST---

http://localhost:3001/api/v1/book

{
    "name": "Harry Potter The Explorer",
    "author": "Jk Rowling",
    "ownerId": "Adipati Arya"
}