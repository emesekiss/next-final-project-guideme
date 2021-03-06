exports.up = async (sql) => {
  await sql`
    CREATE TABLE IF NOT EXISTS resources (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
			name varchar(100),
			description varchar(500),
      contact varchar(100),
			image varchar (100)
    );
	`;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE IF EXISTS resources;
	`;
};
