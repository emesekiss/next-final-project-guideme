import Head from 'next/head';
import Layout from '../../components/Layout';
import { isSessionTokenValid } from '../../util/auth';
import nextCookies from 'next-cookies';
import {
  getUserBySessionToken,
  getSavedResourcesByUserId,
} from '../../util/database';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Guide({
  question,
  choices,
  resourcesFromDB,
  loggedIn,
  user,
}) {
  const [resources, setResources] = useState(resourcesFromDB);

  useEffect(() => {
    setResources(resourcesFromDB);
  }, [resourcesFromDB]);

  return (
    <Layout loggedIn={loggedIn} user={user}>
      <Head>
        <title>Guide</title>
      </Head>
      <div>
        {question !== 'null' ? (
          <>
            <h2>{question}</h2>
            <div>
              {choices.map((choice) => (
                <span key={choice.choice} style={{ marginRight: '2rem' }}>
                  <Link href={`${choice.childOptionId}`}>{choice.choice}</Link>
                </span>
              ))}
            </div>
          </>
        ) : (
          <div>
            <h2>Results</h2>
            {resources &&
              resources.map((resource, idx) => (
                <div key={resource.name}>
                  {resource.name} {resource.contact}
                  {loggedIn && (
                    <button
                      disabled={resource.savedForUser}
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
                          const updatedResources = [...resources];

                          updatedResources[idx] = {
                            ...resource,
                            savedForUser: true,
                          };
                          setResources(updatedResources);
                        }
                      }}
                    >
                      save
                    </button>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  const user = await getUserBySessionToken(token);

  const id = context.query.id;
  const { getQuestion, getChoices, getResourcesResult } = await import(
    '../../util/database'
  );
  let resourcesFromDB = null;
  const question = await getQuestion(id);
  const choices = await getChoices(id);

  if (question === 'null') {
    resourcesFromDB = await getResourcesResult(id);

    if (user) {
      const savedResources = await getSavedResourcesByUserId(user.id);

      resourcesFromDB = resourcesFromDB.map((resource) =>
        savedResources.findIndex((item) => item.id === resource.id) > -1
          ? { ...resource, savedForUser: true }
          : resource,
      );
    }
  }

  return {
    props: {
      question,
      choices,
      resourcesFromDB,
      loggedIn,
      user,
    },
  };
}
