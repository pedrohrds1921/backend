
export const development = {
  client: 'sqlite3',
  useNullAsDefault:true,
  connection: {
    filename: './src/database/database.db'
  },

  pool: {
    afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys=ON", cb)
  },
  migrations: {
    directory: './src/database/knex/migrations'
  },
};
