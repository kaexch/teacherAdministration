import knex from 'knex';

// mySQL db configuration.
const option ={
  client: 'mysql',
  connection: {
    host : 'leechunk-MOBL1',
    user : 'root',
    password : 'qwer1234',
    database : 'sys'
  },
  pool: {
    min:0,
    max:3
  }
};

// Export the DB pool.
const pool = knex(option);

export const knexPool = pool;
