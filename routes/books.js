const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

function Books() {
  return knex('books');
}

function Authors_Books() {
  return knex('authors_books');
}
router.get('/', function(req, res, next) {
  Books().select().then(function (books) {
    return Authors_Books().select().innerJoin('authors', 'authors_books.author_id', 'authors.id').then(function(authors) {
      books.forEach(function(book){
        book.authors = [];

        authors.forEach(function(author){
          if (author.book_id === book.id) {
            book.authors.push(author.first + ' ' + author.last + ' ');
          }
        });
      });
      res.render('books/index', {
        allBooks: books
      })
    });
  });
});


router.get('/new', function(req, res, next) {
  res.render('/new');
})

router.get('/:id', function(req, res, next) {
  Books().where({id: req.params.id}).first().then(function (book) {
      // console.log(book.id);
      return Authors_Books().where({book_id: book.id}).first().innerJoin('authors', 'authors_books.author_id', 'authors.id').then(function(author) {
        // console.log(author);
        book.authors = [];

        if (author.book_id === book.id) {
          book.authors.push(author.first + ' ' + author.last + ' ');
        }
        console.log(book);

      res.render('books/show', {
        theBook: book
      });

    });

  });
});

router.get('/:id/update', function(req, res, next) {
  Books().where({id: req.params.id}).first().then(function (book) {
    res.render('books/edit', {theBook: book})
  })
})

module.exports = router;
