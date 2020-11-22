exports.up = async function (sql) {
  await sql`
	INSERT INTO resources_tags
  (tag_id, resource_id)
VALUES (1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,13),(2,2),(2,3),(2,4),(2,17),(2,6),(2,7),(2,8),(2,9),(2,10),(2,11),(2,12),(2,14),(2,15),(2,16),(3,1),(3,2),(3,3),(3,6),(3,7),(3,8),(3,9),(4,2),(4,3),(4,6),(4,7),(4,8),(4,9),(4,10),(4,11),(4,15),(4,16),(4,17);
   `;
};

exports.down = async function (sql) {
  await sql`
    DELETE FROM resources_tags;
  `;
};
