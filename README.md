# API REST

docker build -t api-books .


# Description


- API REST with Node.js, Express.js, Typescript, MongoDB, Jest, Swagger.

# Technologies

    npm


# Features

# Install & Run

- npm install
- npm run dev

# Routes

- /api/books
- /api/authors
- /api/categories

# Case example

## Books

get - http:localhost:3000/api/books
get - http:localhost:3000/api/books/{id}
post - http:localhost:3000/api/books
put - http:localhost:3000/api/books/{id}
delete - http:localhost:3000/api/books/{id}

### Json example

{
"serie": 2341
"title": "Title book"
"author": "Name or author_id "
"category": "Name"
"publicationDate": 12-7-2077
"pagesNumber": 210
"synopsis": "A lot of text"
}

## Authors

get - http:localhost:3000/api/authors
get - http:localhost:3000/api/authors/{id}
post - http:localhost:3000/api/authors
put - http:localhost:3000/api/authors/{id}
delete - http:localhost:3000/api/authors/{id}

### Json example

{
"serie": 2341
"title": "Title book"
"author": "Name or author_id "
"category": "Name"
}

## Categories

get - http:localhost:3000/api/categories
get - http:localhost:3000/api/categories/{id}
post - http:localhost:3000/api/categories
put - http:localhost:3000/api/categories/{id}
delete - http:localhost:3000/api/categories/{id}

### Json example

{
"serie": 2341
"title": "Title book"
"author": "Name or author_id "
"category": "Name"
}
