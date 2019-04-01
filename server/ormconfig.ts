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
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}