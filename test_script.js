const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

//Invoking function
client.connect((err) => {

  let nameInput = process.argv[2];
  if (err) {
    return console.error("Connection Error", err);
  }
  findPeopleByFirstOrLastName(nameInput, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    } else {
      onResults(result);
    }
  });
});

//Declarative function.
function findPeopleByFirstOrLastName(nameInput, cb){
  client.query(`SELECT * FROM famous_people WHERE first_name = '${nameInput}' OR last_name =
   '${nameInput}'`, cb);
}

//Receiving function that does the magic.
function onResults(result) {
  let nameInput = process.argv[2];

  console.log("Searching ...");
  console.log(`Found ${result.rows.length} person(s) with the name ${nameInput}:`);

    for(i = 0; i < result.rows.length; i++) {
      let rowLoop = result.rows[i];

      let dateObj = new Date(rowLoop.birthdate);
      let month = dateObj.getUTCMonth() + 1; //months from 1-12
      let day = dateObj.getUTCDate();
      let year = dateObj.getUTCFullYear();
      let newDate = year + "/" + month + "/" + day;

      if(nameInput === rowLoop.first_name) {
        console.log(`- ${i + 1}: ${nameInput} ${rowLoop.last_name}, born ${newDate}`);
        }
      else if(nameInput === rowLoop.last_name) {
        console.log(`- ${i + 1}: ${rowLoop.first_name} ${nameInput}, born ${newDate}`);
      }
    }
      client.end();
}





