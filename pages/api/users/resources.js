import { NextApiRequest, NextApiResponse } from 'next';
import {
  saveResource,
  deleteSavedResources,
  getSavedResourcesByUserId,
} from '../../../util/database';

export default async function handler(request, response) {
  let resources;
  let resource;

  if (request.method === 'GET') {
    resources = await getSavedResourcesByUserId(userId);
  } else if (request.method === 'POST') {
    const newResource = request.body;
    resource = await saveResource(newResource.userId, newResource.resourceId);
  } else if (request.method === 'DELETE') {
    const deletedResource = request.body;

    resources = await deleteSavedResources(
      deletedResource.resourceId,
      deletedResource.userId,
    );
  }
  //fix the user delete function
  response.status(200).send({ success: true });
}
