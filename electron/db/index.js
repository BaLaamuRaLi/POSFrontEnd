import knex from 'knex'

const db = knex({
    client: 'better-sqlite3',
    connection: {
        filename: './electron/db/pos.sqlite3'
    },
    useNullAsDefault: true,
    // migrations:{
    //   directory:'./electron/db/migrations',
    // },
    pool:{
      afterCreate: (conn, done) => {
       conn.prepare('PRAGMA foreign_keys = ON').run();
        done(null, conn);
      }
    }
})

export default db