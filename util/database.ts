import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';
import { Session, User } from './types';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();

dotenv.config();

const sql =
  process.env.NODE_ENV === 'production'
    ? // Heroku needs SSL connections but
      // has an "unauthorized" certificate
      // https://devcenter.heroku.com/changelog-items/852
      postgres({ ssl: { rejectUnauthorized: false } })
    : postgres({
        // Avoid the error below of using too many connection slots with
        // Next.js hot reloading
        //
        // Example error message:
        //
        // Error: remaining connection slots are reserved for non-replication superuser connectionsError: remaining connection slots are reserved for non-replication superuser connections
        idle_timeout: 5,
      });

    

export async function registerUser(username: string, passwordHash: string) {
  const users = await sql<User[]>`
    INSERT INTO users
      (username, password_hash, avatar)
    VALUES
      (${username}, ${passwordHash}, 8)
    RETURNING *;
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function getUserByUsername(username: string) {
  const users = await sql<User[]>`
    SELECT * FROM users WHERE username = ${username};
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function getSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
    SELECT * FROM sessions WHERE token = ${token};
  `;

  return sessions.map((s) => camelcaseKeys(s))[0];
}

export async function deleteSessionByToken(token: string | undefined) {
  if (typeof token === 'undefined') return;
  await sql`
    DELETE FROM sessions WHERE token = ${token};
  `;
}

export async function deleteExpiredSessions() {
  await sql`
    DELETE FROM sessions WHERE expiry_timestamp < NOW();
  `;
}

export async function insertSession(token: string, userId: number) {
  const sessions = await sql<Session[]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING *;
  `;

  return sessions.map((s) => camelcaseKeys(s))[0];
}

// Example of a database query with an Inner Join
export async function getUserBySessionToken(token: string | undefined) {
  if (typeof token === 'undefined') return null;

  const users = await sql<User[]>`
    SELECT
      users.id,
      users.username,
      avatar
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      users.id = sessions.user_id;
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function getUserById(id: string) {
  // Return undefined if the id is not
  // in the correct format
  if (!/^\d+$/.test(id)) return null;

  const users = await sql`
    SELECT * FROM users WHERE id = ${id};
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function updateUserById(id: string, user: User) {
  // Return undefined if the id is not
  // in the correct format
  if (!/^\d+$/.test(id)) return null;

  const allowedProperties = ['username', 'avatar'];
  const userProperties = Object.keys(user);

  if (userProperties.length < 1) {
    return undefined;
  }

  const difference = userProperties.filter(
    (prop) => !allowedProperties.includes(prop),
  );

  if (difference.length > 0) {
    return undefined;
  }

  let users: User[] = [];

  if ('username' in user) {
    users = await sql`
      UPDATE users
        SET username = ${user.username}
        WHERE id = ${id}
        RETURNING *;
    `;
  }

  if ('avatar' in user) {
    users = await sql`
      UPDATE users
        SET avatar = ${user.avatar}
        WHERE id = ${id}
        RETURNING *;
    `;
  }

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function deleteUserById(id: string) {
  // Return undefined if the id is not
  // in the correct format
  if (!/^\d+$/.test(id)) return null;

  const users = await sql`
    DELETE FROM users
      WHERE id = ${id}
      RETURNING *;
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function insertUser(user: User) {
  const requiredProperties = ['username'];
  const userProperties = Object.keys(user);

  if (userProperties.length !== requiredProperties.length) {
    return undefined;
  }

  const difference = userProperties.filter(
    (prop) => !requiredProperties.includes(prop),
  );

  if (difference.length > 0) {
    return undefined;
  }

  const users = await sql`
    INSERT INTO users
      (first_name, last_name, city)
    VALUES
      (${user.username})
    RETURNING *;
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function getUsers() {
  const users = await sql`
    SELECT * FROM users;
  `;
  return users.map((u) => camelcaseKeys(u));
}

export async function getResources() {
  const resources = await sql`
    SELECT * FROM resources;
  `;
  return resources.map((u) => camelcaseKeys(u));
}

export async function getResourceById(id: string) {
  // Return undefined if the id is not
  // in the correct format
  if (!/^\d+$/.test(id)) return null;

  const resources = await sql`
    SELECT * FROM resources WHERE id = ${id};
  `;

  return resources.map((u) => camelcaseKeys(u))[0];
}

export async function saveResource(userId: number, resourceId: number) {
  const savedResources = await sql<User[]>`
    INSERT INTO users_resources
      (user_id, resource_id)
    VALUES
      (${userId}, ${resourceId})
    RETURNING *;
  `;

  return savedResources.map((u) => camelcaseKeys(u));
}

export async function getSavedResourcesByUserId(userId: number) {
  const resources = await sql`
  SELECT resources.name, resources.id
  FROM resources, users_resources 
  WHERE users_resources.user_id = ${userId} AND resources.id = users_resources.resource_id;`;

  return resources.map((u) => camelcaseKeys(u));
}

export async function deleteSavedResources(resourceId: number, userId: number) {
  const deletedResources = await sql`
    DELETE FROM users_resources
      WHERE resource_id = ${resourceId} AND user_id = ${userId}
      ;
  `;

  return deletedResources.map((u) => camelcaseKeys(u));
}

export async function filterResourcesByTag(tag: string) {
  const filteredResources = await sql`SELECT resources.name, tags.tag 
FROM resources, tags, resources_tags 
WHERE resources_tags.tag_id = tags.id 
AND tags.tag = ${tag}
AND resources_tags.resource_id = resources.id;`;
  return filteredResources.map((u) => camelcaseKeys(u));
}

export async function getChoices(optionsId: number) {
  const choices = await sql`SELECT options_options.child_option_id, options.choice
FROM options, options_options
WHERE options_options.parent_option_id = ${optionsId} AND options_options.child_option_id = options.id`;
  return choices.map((u) => camelcaseKeys(u));
}
export async function getQuestion(optionsId: number) {
  const questions = await sql`SELECT options.question
FROM options
WHERE options.id = ${optionsId}`;
  return questions[0].question;
}

export async function getResourcesResult(optionsId: number) {
  const results = await sql`SELECT resources.name, resources.contact, resources.id
FROM resources, options_resources
WHERE ${optionsId} = options_resources.option_id AND options_resources.resource_id = resources.id`;
  return results.map((u) => camelcaseKeys(u));
}
