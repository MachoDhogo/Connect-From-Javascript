//changes to the schema
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('milestones2', function(table){
      table.increments();
      table.string('description');
      table.date('date_achieved');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('famous_people.id');
    })
  ]);
};
//down tells them how to undo change to schema
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones')
  ]);
};

