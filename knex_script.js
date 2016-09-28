const settings = require('./settings');
const knex = require('knex')({
  client: 'pg',
  connection: {
    user      : settings.user,
    password  : settings.password,
    database  : settings.database,
    host      : settings.hostname,
    port      : settings.port,
    ssl       : settings.ssl
  }
});

//TEMPLATE TO CONNECT
// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host : '127.0.0.1',
//     user : 'your_database_user',
//     password : 'your_database_password',
//     database : 'myapp_test'
//   }
// });
const args = process.argv.slice(2)

knex('famous_people').returning('*')
  .insert({
  first_name: args[0],
  last_name: args[1],
  birthdate: args[2]
 })
 .asCallback((err, rows) => {
  if(err) return console.error(err);
  console.log(rows);
  knex.destroy();
  });

// knex.select('name').from('users')
// .where('id', '>', 20)
// .andWhere('id', '<', 200)
// .limit(10)
// .offset(x)
// .asCallback(function(err, rows) {
//   if (err) return console.error(err);
//   knex.select('id').from('nicknames')
//     .whereIn('nickname', _.pluck(rows, 'name'))
//     .asCallback(function(err, rows) {
//       if (err) return console.error(err);
//       console.log(rows);
//     });
// });