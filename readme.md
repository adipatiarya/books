Client server Init

#ROUTING

----GET---
http://localhost:3001/api/v1/book?id=1212121

http://localhost:3001/api/v1/books
http://localhost:3001/api/v1/books?skip=3&limit=2&order=asc
http://localhost:3001/api/v1/books?skip=3&limit=2&order=desc


---POST---

http://localhost:3001/api/v1/book

	{
        "review": "Adfafafasasa",
        "pages": "56",
        "rating": 2,
        "price": "232223",
        "_id": "5c92c3428d93094773d7a796",
        "name": "ASAsa",
        "author": "aasa",
        "ownerId": "KIrun",
     }