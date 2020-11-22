exports.up = async function (sql) {
  await sql`
    CREATE TABLE resources_tags (
  PRIMARY KEY (tag_id, resource_id),
  tag_id INT REFERENCES tags (id),
  resource_id INT REFERENCES resources (id)
);
  `;
};

exports.down = async function (sql) {
  await sql`
    DROP TABLE IF EXISTS resources_tags;
  `;
};
