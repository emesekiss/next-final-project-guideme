exports.up = async function (sql) {
  await sql`
    CREATE TABLE options_options (
  PRIMARY KEY (parent_option_id, child_option_id),
  parent_option_id INT REFERENCES options (id),
  child_option_id INT REFERENCES options (id)
);
  `;
};

exports.down = async function (sql) {
  await sql`
    DROP TABLE IF EXISTS options_options;
  `;
};
