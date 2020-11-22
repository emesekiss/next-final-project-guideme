import { filterResourcesByTag } from '../../../util/database';

export default async function handler(request, response) {
  let resources;
  const tag = request.query.tag;

  if (request.method === 'GET') {
    resources = await filterResourcesByTag(tag);
  }

  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.end(
    JSON.stringify({
      ...(resources ? { resources: resources } : {}),
    }),
  );
}
