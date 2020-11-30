/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
import {
  actionItemsWrapper,
  cardStyles,
  wholeCardStyles,
} from '../../styles/styles';

const guideStyles = css`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 4px;
  background-color: white;
  h2 {
    background-color: #41b076;
    border-radius: 4px;
    color: white;
    text-align: center;
    padding: 20px;
    margin-bottom: 0px;
  }
`;

export const choiceStyles = css`
  border: 1px solid #ff8914;
  color: #ff8914;
  font-size: 1.5rem;
  padding: 10px 20px;
  border-radius: 4px;
  background-color: white;
  margin: 10px;

  &:hover {
    background-color: #ff8914;
    color: white;
    cursor: pointer;
  }
`;

const choicesWrapperStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 50px;
  @media screen and (min-width: 760px) {
    flex-direction: row;
    display: flex;
    justify-content: space-around;
    padding: 100px 0;
  }
`;

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

      {question !== 'null' ? (
        <>
          <div css={guideStyles}>
            <h2>{question}</h2>
            <div css={choicesWrapperStyles}>
              {choices.map((choice) => (
                <Link key={choice.choice} href={`${choice.childOptionId}`}>
                  <a css={choiceStyles}>{choice.choice}</a>
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>
          <h1>Results</h1>
          <div css={wholeCardStyles}>
            {resources &&
              resources.map((resource, idx) => (
                <div css={cardStyles} key={resource.name}>
                  <div>
                    <img
                      src={`/resources/${resource.image}`}
                      alt={resource.id}
                    />
                    <h4>{resource.name}</h4>
                    <p>{resource.description}</p>
                  </div>
                  <div css={actionItemsWrapper}>
                    <a href={resource.contact}>CONTACT</a>
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
                        SAVE
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
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
