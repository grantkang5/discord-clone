const parser = require('pg-connection-string')
const db = parser(process.env.DATABASE_URL)

const config = {
  development: {
    type: "postgres",
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: true,
    logging: false,
    keepConnectionAlive: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    }
  },
  production: {
    type: 'postgres',
    host: db.host,
    port: db.port,
    username: db.user,
    password: db.password,
    database: db.database,
    synchronize: true,
    logging: false,
    ssl: true,
    entities: ['dist/entity/**/*.js'],
    migrations: ['dist/database/migration/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
    cli: {
      entitiesDir: 'dist/entity',
      migrationsDir: 'dist/database/migration',
      subscribersDir: 'dist/subscriber'
    }
  }
}

module.exports = config[process.env.NODE_ENV]
