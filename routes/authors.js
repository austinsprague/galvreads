const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

function Authors() {
  return knex('authors');
}

router.get('/authors', function(req, res) {
  Authors().select().then(function (books) {
    res.render('authors/index', {allAuthors: books })
  });
});
