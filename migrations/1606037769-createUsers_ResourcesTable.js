exports.up = async function (sql) {
  await sql`
    CREATE TABLE users_resources (
  PRIMARY KEY (user_id, resource_id),
  user_id INT REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  resource_id INT REFERENCES resources (id)
);
  `;
};

exports.down = async function (sql) {
  await sql`
    DROP TABLE IF EXISTS users_resources;
  `;
};
