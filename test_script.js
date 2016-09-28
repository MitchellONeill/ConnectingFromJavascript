
const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

//var lookup = require("./lookup_people.js");
module.exports = function listpeople(lastname) {
  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    client.query("SELECT * FROM famous_people WHERE last_name = $1::varchar", [lastname], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      let value = result.rows.forEach(function(row){
        let person = `${row.id}, ${row.first_name}, ${row.last_name}, ${row.birthdate}`;
        console.log(person);
      })

      //console.log(result.rows[0]); //output: 1
      client.end();
    });
  });
}

module.exports = function addpeople(firstname, lastname, dob) {

}