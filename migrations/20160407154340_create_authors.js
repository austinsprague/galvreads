
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books'), function(table) {
    table.increments();
    table.string('bio');
    table.string('portrait');
    table.string('Author 1 First Name');
    table.string('Author 1 Last Name');
    table.string('Author 1 Biography');
    table.string('Author 1 Portrait URL');
    

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors');
};
