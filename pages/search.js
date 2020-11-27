/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../components/Layout';
import Head from 'next/head';
import { isSessionTokenValid } from '../util/auth';
import nextCookies from 'next-cookies';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUserBySessionToken } from '../util/database';
import { navigationLinkStyles } from '../pages/resources/[id]';

export default function Search({ loggedIn, allResources, user }) {
  const [filteredResources, setFilteredResources] = useState(allResources);
  const [filter, setFilter] = useState(null);

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
        <h4> Filter by tag</h4>
        <div>
          <button onClick={clear} css={navigationLinkStyles}>
            clear filter
          </button>
        </div>
        <button onClick={() => setFilter('offline')}>offline</button>
        <button onClick={() => setFilter('digital')}>digital</button>
        <button onClick={() => setFilter('anxiety')}>anxiety</button>
        <button onClick={() => setFilter('low mood')}>low mood</button>
        <button onClick={() => setFilter('self-harm')}>self-harm</button>

        <div>
          {filteredResources.map((resource) => (
            <Link key={resource.name} href={`/resources/${resource.id}`}>
              <div>{resource.name}</div>
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
