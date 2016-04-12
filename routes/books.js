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
    //inner join both tables

    //array for unique id for book or author
    //else append the array

    res.render('books/index', {
      allBooks: books
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
