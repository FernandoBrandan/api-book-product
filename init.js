db = db.getSiblingDB('library');
db.authors.insertMany([  { name: "Author 1" },  { name: "Author 2" },  { name: "Author 3" }]);
db.categories.insertMany([  { name: "Fiction" },  { name: "Non-fiction" },  { name: "Science" }]);
db.books.insertMany([
  { title: "Book 1", author: "Author 1", category: "Fiction" },
  { title: "Book 2", author: "Author 2", category: "Non-fiction" },
  { title: "Book 3", author: "Author 3", category: "Science" }
]);
