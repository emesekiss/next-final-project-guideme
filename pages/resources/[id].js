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
import {
  linkStyles,
  cardStyles,
  actionItemsWrapper,
} from '../../styles/styles';

const idCardWrapper = css`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
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
      <div css={idCardWrapper}>
        <div css={cardStyles}>
          <div>
            <img src={`/resources/${resource.image}`} alt={resource.id} />
            <h4>{resource.name}</h4>
            <p>{resource.description}</p>
          </div>
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
      </div>

      <Link href={'/search'}>
        <a css={linkStyles}>Back to Search</a>
      </Link>
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
