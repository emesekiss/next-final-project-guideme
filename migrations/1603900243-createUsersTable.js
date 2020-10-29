exports.up = async (sql) => {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      username varchar(40) UNIQUE,
      password_hash varchar (100)
    );
	`;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE IF EXISTS users;
	`;
};
