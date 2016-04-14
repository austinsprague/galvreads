var knex = require './knex';

module.exports = function () {
  return knex('books').where({id: bookId}).first();
}
