exports.up = async function (sql) {
  await sql`
	INSERT INTO options_options
  (parent_option_id, child_option_id)
VALUES (1,2),(1,3),(1,4),(2,5),(2,6),(3,7),(3,8),(3,9),(4,10),(4,11),(5,12),(5,13),(6,14),(6,15),(7,16),(7,17),(8,18),(8,19),(9,20),(9,21),(11,22),(11,23),(16,24),(16,25),(18,26),(18,27),(20,28),(20,29),(22,30),(22,31);
   `;
};

exports.down = async function (sql) {
  await sql`
    DELETE FROM options_options;
  `;
};
