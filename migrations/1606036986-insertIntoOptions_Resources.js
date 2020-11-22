exports.up = async function (sql) {
  await sql`
	INSERT INTO options_resources
  (option_id, resource_id)
VALUES (10,3),(10,2),(10,6),(10,8),(10,7),(10,9),(12,2),(12,3),(12,7),(12,8),(12,10),(13,4),(13,5),(13,8),(14,10),(14,6),(14,9),(15,4),(15,13),(15,5),(17,4),(17,8),(17,14),(24,2),(24,3),(24,6),(24,7),(25,15),(25,8),(19,4),(19,8),(19,14),(19,13),(26,3),(26,15),(27,16),(27,17),(27,9),(28,11),(28,2),(28,6),(28,7),(29,12),(29,14),(29,4),(21,3),(21,8),(21,11),(21,7),(31,1),(31,4),(31,14),(30,2),(23,3),(23,8),(23,7);
   `;
};

exports.down = async function (sql) {
  await sql`
    DELETE FROM options_resources;
  `;
};
