import Layout from '../components/Layout';
import Head from 'next/head';
import { isSessionTokenValid } from '../util/auth';
import nextCookies from 'next-cookies';
import { useState } from 'react';

const organisations = [
  { name: 'name1', tags: ['offline'] },
  { name: 'name2', tags: ['online'] },
  { name: 'name3', tags: ['eatingDisorder', 'offline'] },
];

export default function Search({ loggedIn }) {
  const [filteredOrgs, setFilteredOrgs] = useState(organisations);

  const search = (e) => {
    const filtered = organisations.filter((org) =>
      org.tags.some((i) => i === e.target.value),
    );
    setFilteredOrgs(filtered);
  };

  const clear = () => {
    setFilteredOrgs(organisations);
  };

  return (
    <div>
      <Layout loggedIn={loggedIn}>
        <Head>
          <title>Search</title>
        </Head>
        <h2>List of organisations:</h2>

        <p>Filter by tag</p>
        <div>
          <button onClick={clear}>clear filter</button>
        </div>
        <button value="offline" onClick={search}>
          offline
        </button>
        <button value="online" onClick={search}>
          online
        </button>
        <button value="eatingDisorder" onClick={search}>
          eating disorder
        </button>

        <div>
          {filteredOrgs &&
            filteredOrgs.map((org) => <p key={org.name}>{org.name}</p>)}
        </div>
      </Layout>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  return { props: { loggedIn } };
}
