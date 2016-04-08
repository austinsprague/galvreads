
exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors'), function(table) {
    table.increments();
    table.string('Book Title');
    table.integer('Book Genre');
    table.text('Book Description');
    table.string('Book Cover URL')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors');
};
