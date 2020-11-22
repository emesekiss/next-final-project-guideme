import Head from 'next/head';
import Layout from '../../components/Layout';
import { isSessionTokenValid } from '../../util/auth';
import nextCookies from 'next-cookies';
import {
  getSavedResourcesByUserId,
  getUserBySessionToken,
} from '../../util/database';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Resource({
  loggedIn,
  resource,
  user,
  isResourceSaved,
}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  return (
    <Layout loggedIn={loggedIn} user={user}>
      <Head>
        <title>Resource</title>
      </Head>
      <div>
        <p>{resource.name}</p>
        <p>{resource.description}</p>
        <img
          style={{ height: '100px' }}
          src={`/resources/${resource.image}`}
          alt={resource.id}
        />
        {loggedIn && (
          <button
            disabled={isResourceSaved}
            onClick={async (e) => {
              // Prevent the default browser behavior of forms
              e.preventDefault();

              // Send the username, password and token to the
              // API route
              const response = await fetch('/api/users/resources', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userId: user.id,
                  resourceId: resource.id,
                }),
              });

              const { success } = await response.json();

              if (success) {
                // Redirect to the homepage if successfully registered
                router.push('/search');
              } else {
                setErrorMessage('Failed!');
              }
            }}
          >
            save
          </button>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);

  const id = context.query.id;
  const { getResourceById } = await import('../../util/database');
  const resource = await getResourceById(id);

  const user = await getUserBySessionToken(token);

  let isResourceSaved = false;
  if (user) {
    const savedResources = await getSavedResourcesByUserId(user.id);

    isResourceSaved =
      savedResources.findIndex((item) => item.resourceId === +id) > -1;
  }

  return {
    props: {
      resource,
      loggedIn,
      user,
      isResourceSaved,
    },
  };
}
