const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

function Authors() {
  return knex('authors');
}

function Authors_Books() {
  return knex('authors_books');
}

router.get('/', function(req, res, next) {
  Authors().select().then(function (authors) {
    return Authors_Books().select().innerJoin('books', 'authors_books.book_id', 'books.id').then(function(books) {
      authors.forEach(function(author){
        author.books = [];

        books.forEach(function(book){
          if (book.author_id === author.id) {
            author.books.push(book.title);
          }
        });
      });
      res.render('authors/index', {
        allAuthors: authors
      })
    });
  });
});

router.get('/new', function(req, res, next) {
  res.render('authors/new');
});

router.get('/:id', function(req, res, next) {
  Authors().where({ id: req.params.id }).first().then(function (author) {
    return Authors_Books().where({ author_id: author.id
    }).innerJoin('books', 'authors_books.book_id', 'books.id').then(function(book) {
      author.books = [];

      book.forEach(function (item){
        author.books.push(item.title);
      })
      res.render('authors/show', {
        theAuthor: author
      });
    });
  });
});

router.post('/', function(req, res, next) {
  Authors().insert({
    first: req.body.first,
    last: req.body.last,
    bio: req.body.bio,
    authors_url: req.body.authors_url,
  }).then(function() {
  res.redirect('/authors');
  })
})

router.get('/:id/update', function(req, res, next) {
  Authors().where({id: req.params.id}).first().then(function (author) {
    res.render('authors/update', {theAuthor: author})
  })
})

module.exports = router;
