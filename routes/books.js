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
  res.render('books/new');
});

router.get('/:id', function(req, res, next) {
  Books().where({ id: req.params.id }).first().then(function (book) {
    return Authors_Books().where({ book_id: book.id
    }).innerJoin('authors', 'authors_books.author_id', 'authors.id').then(function(author) {
      book.authors = [];
      author.forEach(function (item){
        book.authors.push(item.first + ' ' + item.last + ' ');
      })
      res.render('books/show', {
        theBook: book
      });
    });
  });
});


// router.get('/:id/update', function(req, res, next) {
//   Books().where({id: req.params.id}).first().then(function (book) {
//     return Authors_Books().where({ book_id: book.id
//   }).first().innerJoin('authors', 'authors_books.author_id', 'authors.id').then(function(author)
//     res.render('books/update', {
//       theBook: book
//     })
//   })
// })

router.post('/', function(req, res, next) {
  Books().insert({
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
  }).then(function () {
    // return Authors_Books().insert({
    //   author_id: req.body.author_id,
    //   book_id: id,
    // }).innerJoin('books', 'authors_books.book_id', 'book.id').then(function() {
      res.redirect('/books');
    // })
  })
})




module.exports = router;
