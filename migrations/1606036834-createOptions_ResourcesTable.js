exports.up = async function (sql) {
  await sql`
    CREATE TABLE options_resources (
  PRIMARY KEY (option_id, resource_id),
  option_id INT REFERENCES options (id),
  resource_id INT REFERENCES resources (id)
);
  `;
};

exports.down = async function (sql) {
  await sql`
    DROP TABLE IF EXISTS options_resources;
  `;
};
