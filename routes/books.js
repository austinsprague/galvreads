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
  // Authors_Books().select().innerJoin('books', 'books.id', 'authors_books.book_id' ).innerJoin( 'authors', 'authors.id', 'authors_books.author_id' ).then(function(books){
  //   // console.log(books[1].id);
  //   // console.log(books.length);
  //   console.log(books);
  //   books.forEach(function(book) {
  //     book.authors= [];
  //     if (book.authors)



  Authors_Books().select().innerJoin('books', 'books.id', 'authors_books.book_id').then(function(books) {
  Books().select().then(function (books) {
    return Authors_Books().select().innerJoin('authors', 'authors_books.author_id', 'authors.id').then(function(authors){
      books.forEach(function(book){
        book.authors = [];
        authors.forEach(function(author){
          if (author.book_id === book.id) {
            book.authors += author.first + ' ' + author.last + ' ';
          }
        })
      })

      res.render('books/index', {
        allBooks: books

        })
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
