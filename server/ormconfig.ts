module.exports = {
  "type": "postgres",
  "host": process.env.PGHOST,
  "port": process.env.PGPORT,
  "username": process.env.PGUSER,
  "password": process.env.PGPASSWORD,
  "database": process.env.PGDATABASE,
  "synchronize": process.env.NODE_ENV === 'development' ? true : false,
  "logging": false,
  "keepConnectionAlive": true,
  "entities": ["dist/entity/**/*.ts"],
  "migrations": ["dist/migration/**/*.ts"],
  "subscribers": ["dist/subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}