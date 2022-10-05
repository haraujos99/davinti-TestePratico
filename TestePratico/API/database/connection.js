const knex = require('knex')({
    client: 'postgres',
    connection: {
      host : '',
      port : 5432,
      user : '',
      password : "",
      database : ''
    }
  }
);

  module.exports = knex;