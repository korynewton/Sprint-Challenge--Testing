exports.up = function(knex) {
  return knex.schema.createTable('games', tbl => {
    tbl.increments();

    tbl.string('title', 100).notNullable();
    tbl.string('genre', 30).notNullable();
    tbl.string('releaseYear', 4);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('games');
};
