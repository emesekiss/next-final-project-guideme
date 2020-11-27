/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { isSessionTokenValid } from '../../util/auth';
import nextCookies from 'next-cookies';
import {
  getResourceById,
  getSavedResourcesByUserId,
  getUserBySessionToken,
} from '../../util/database';
import { useState } from 'react';
import Link from 'next/link';

export const cardStyles = css`
  background-color: white;
  max-width: 300px;

  padding: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  font-size: 18px;
  border-radius: 4px;
  text-align: center;
  img {
    max-height: 100px;
    max-width: 200px;
  }
  input {
    font-size: 1.125rem;
    font-family: 'Josefin Sans';
  }
  button,
  a {
    border: 1px solid #41b076;
    color: #41b076;
    font-size: 14px;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    background-color: white;
  }
  a:hover,
  button:hover {
    background-color: #41b076;

    color: white;
  }
  button:disabled {
    opacity: 0.65;
    cursor: unset;
    :hover {
      background-color: white;
      color: #41b076;
    }
  }
  p {
    font-size: 18px;
    font-weight: 300;
  }
  h5 {
    color: #ff8914;
    font-size: 21px;
    font-weight: normal;
    margin: 30px;
  }
`;

export const navigationLinkStyles = css`
  border: 1px solid #1564d1;
  color: #1564d1;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #fcf8f2;
  cursor: pointer;

  :hover {
    background-color: #1564d1;
    color: white;
  }
`;
export const actionItemsWrapper = css`
  display: flex;
  flex-direction: column;

  & > *:first-child {
    margin-bottom: 10px;
  }
`;

export default function Resource({
  loggedIn,
  resource,
  user,
  isResourceSavedInDB,
}) {
  const [isResourceSaved, setIsResourceSaved] = useState(isResourceSavedInDB);

  return (
    <Layout loggedIn={loggedIn} user={user}>
      <Head>
        <title>Resource</title>
      </Head>
      <div>
        <div css={cardStyles} style={{ margin: 'auto' }}>
          <img src={`/resources/${resource.image}`} alt={resource.id} />
          <h5>{resource.name}</h5>
          <p>{resource.description}</p>
          <div css={actionItemsWrapper}>
            <a href={resource.contact}>CONTACT</a>

            {loggedIn && (
              <button
                disabled={isResourceSaved}
                onClick={async (e) => {
                  // Prevent the default browser behavior of forms
                  e.preventDefault();

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
                    setIsResourceSaved(true);
                  }
                }}
              >
                SAVE
              </button>
            )}
          </div>
        </div>
        <Link href={'/search'}>
          <a css={navigationLinkStyles}>Back to Search</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);

  const id = context.query.id;
  const resource = await getResourceById(id);

  const user = await getUserBySessionToken(token);

  let isResourceSavedInDB = false;
  if (user) {
    const savedResources = await getSavedResourcesByUserId(user.id);

    isResourceSavedInDB =
      savedResources.findIndex((item) => item.id === +id) > -1;
  }

  return {
    props: {
      resource,
      loggedIn,
      user,
      isResourceSavedInDB,
    },
  };
}
