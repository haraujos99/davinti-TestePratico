const knex = require('knex')({
    client: 'postgres',
    connection: {
      host : 'localhost',
      port : 5432,
      user : 'postgres',
      password : "36221087",
      database : 'davinti'
    }
  }
);

  module.exports = knex;