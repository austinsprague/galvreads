const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

function Authors() {
  return knex('authors');
}

router.get('/', function(req, res) {
  Authors().select().then(function (authors) {
    res.render('authors/index', {
      allAuthors: authors
    })
  });
});

router.get('/new', function(req, res, next) {
  res.render('authors/new');
});

router.get('/:id', function(req, res, next) {
  Authors().where({id: req.params.id}).first().then(function (author) {
    res.render('authors/show', {
      theAuthor: author
    });
  });
});

router.get('/:id/update', function(req, res, next) {
  Authors.where({id: req.params.id}).first().then(function (author) {
    res.render('authors/edit', {theAuthor: author})
  })
})


module.exports = router;
