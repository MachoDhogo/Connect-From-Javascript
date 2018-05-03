const settings = require("./settings");

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

//Insert as callback
knex('famous_people').insert({
  first_name: process.argv[2],
  last_name: process.argv[3],
  birthdate: process.argv[4]
})
.asCallback(function(err, rows) {
  if(err) return console.error(err);
});

//Select as callback
knex.select('*').from('famous_people')
.asCallback(function(err, rows) {
  if(err) return console.error(err);
  console.log(rows);
  knex.destroy();
});


