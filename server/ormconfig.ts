module.exports = {
  "type": "postgres",
  "host": process.env.PGHOST,
  "port": 5432,
  "username": "postgres",
  "password": "pgpassword",
  "database": "postgres",
  "synchronize": process.env.NODE_ENV === 'development' ? true : false,
  "logging": false,
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}