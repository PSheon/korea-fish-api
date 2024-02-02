export default ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "localhost"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "school"),
      user: env("DATABASE_USERNAME", "paul"),
      password: env("DATABASE_PASSWORD", "somestrongpassword"),
      ssl: env.bool("DATABASE_SSL", false),
    },
  },
});
