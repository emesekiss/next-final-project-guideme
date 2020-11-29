/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../components/Layout';
import Head from 'next/head';
import { isSessionTokenValid } from '../util/auth';
import nextCookies from 'next-cookies';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUserBySessionToken } from '../util/database';
import { editButtonStyles } from './profile';

const searchWrapperStyles = css`
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
`;

export const tagLinkStyles = css`
  border: 1px solid #41b076;
  color: #41b076;
  font-size: 0.875rem;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #fcf8f2;
  margin: 5px;

  &:hover {
    background-color: #41b076;
    color: white;
    cursor: pointer;
  }
`;
const searchResultStyles = css`
  margin: 10px 0px;
  a {
    cursor: pointer;
  }
`;

export default function Search({ loggedIn, allResources, user }) {
  const [filteredResources, setFilteredResources] = useState(allResources);
  const [filter, setFilter] = useState(null);
  const [isTagSelected, setIsTagSelected] = useState(false);
  useEffect(async () => {
    if (filter) {
      const response = await fetch(`/api/users/filterResources?tag=${filter}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { resources } = await response.json();
      setFilteredResources(resources);
    }
  }, [filter]);

  const clear = () => {
    setFilteredResources(allResources);
  };
  return (
    <div>
      <Layout loggedIn={loggedIn} user={user}>
        <Head>
          <title>Search</title>
        </Head>

        <h1> List of resources</h1>
        <h3> Filter by tag</h3>
        <div css={searchWrapperStyles}>
          <div>
            <button css={tagLinkStyles} onClick={() => setFilter('offline')}>
              offline
            </button>
            <button css={tagLinkStyles} onClick={() => setFilter('digital')}>
              digital
            </button>
            <button css={tagLinkStyles} onClick={() => setFilter('anxiety')}>
              anxiety
            </button>
            <button css={tagLinkStyles} onClick={() => setFilter('low mood')}>
              low mood
            </button>
            <button css={tagLinkStyles} onClick={() => setFilter('self-harm')}>
              self-harm
            </button>
          </div>
          <div>
            <button onClick={clear} css={editButtonStyles}>
              clear filter
            </button>
          </div>
        </div>

        <div>
          {filteredResources.map((resource) => (
            <Link key={resource.name} href={`/resources/${resource.id}`}>
              <div css={searchResultStyles}>
                <img src="/point.svg" />
                <a>{resource.name}</a>
              </div>
            </Link>
          ))}
        </div>
      </Layout>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);

  const { getResources } = await import('../util/database');

  const allResources = await getResources();
  const user = await getUserBySessionToken(token);
  return { props: { loggedIn, allResources, user } };
}
