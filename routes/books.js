const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

function Books() {
  return knex('books');
}

function Author_Book() {
  return knex('authors_books');
}
router.get('/', function(req, res, next) {
  // Author_Book().select().innerJoin('books', 'books.id', 'authors_books.book_id').then(function(books) {
  //   console.log(books);
  Books().select().then(function (books) {
    return Author_Book().select().innerJoin('authors', 'author_id', 'authors.id').then(function(authors){
      books.forEach(function(book){
        book.authors = '';
        authors.forEach(function(author){
          if (author.book_id === book.id) {
            book.authors += author.first + ' ' + author.last + ' ';
          }
        })
      })

      res.render('books/index', {
        allBooks: books
      });
    });
  });
});

router.get('/new', function(req, res, next) {
  res.render('/new');
});

router.get('/:id', function(req, res, next) {
  Books().where({id: req.params.id}).first().then(function (book) {
    res.render('/show', {
      theBook: book
    })
  })
})

module.exports = router;
