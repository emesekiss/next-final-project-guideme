exports.up = async function (sql) {
  await sql`
    INSERT INTO options
  (choice, question)
VALUES('null','I want help with...'),('anxiety','Are you affected by any of the following?'),('low modd','Are you affected by any of the following?'),('self-harm','Select the most relevant'),('panic attack','I would like to do something...'),('cannot switch off','I would like to do something...'),('clinical depression','I would like to do something...'),('feeling alone','I would like to do something...'),('drinking too much','How often are you affected by this?'),('I am going to harm myself now','null'),('I might harm myself','How often are you affected by this?'),('offline','null'),('digital','null'),('offline','null'),('digital','null'),('offline','I would like to do something...'),('digital','null'),('offline','I would like to do something...'),('digital','null'),('sometimes','I would like to do something...'),('all the time','null'),('sometimes','I would like to do something...'),('all the time','null'),('with a professional','null'),('by myself','null'),('by myself','null'),('with others','null'),('offline','null'),('digital','null'),('offline','null'),('digital','null');
`;
};
exports.down = async function (sql) {
  await sql`
    DELETE FROM options;
  `;
};
