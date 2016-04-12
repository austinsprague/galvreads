const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

function Books() {
  return knex('books');
}

router.get('/', function(req, res, next) {
  Books().select().then(function (books) {
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
