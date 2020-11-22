exports.up = async function (sql) {
  await sql`
    INSERT INTO tags
  (tag)
VALUES('anxiety'),('low mood'),('self-harm'),('offline'),('digital');
`;
};
exports.down = async function (sql) {
  await sql`
    DELETE FROM tags;
  `;
};
