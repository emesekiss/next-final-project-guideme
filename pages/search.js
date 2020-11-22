import Layout from '../components/Layout';
import Head from 'next/head';
import { isSessionTokenValid } from '../util/auth';
import nextCookies from 'next-cookies';
import { useState } from 'react';
import Link from 'next/link';
import { getUserBySessionToken } from '../util/database';

export default function Search({ loggedIn, resources, user }) {
  // const [filteredOrgs, setFilteredOrgs] = useState(resources);

  // const search = (e) => {
  //   const filtered = resources.filter((resource) =>
  //     resource.tags.some((i) => i === e.target.value),
  //   );
  //   setFilteredOrgs(filtered);
  // };

  // const clear = () => {
  //   setFilteredOrgs(resources);
  // };

  return (
    <div>
      <Layout loggedIn={loggedIn} user={user}>
        <Head>
          <title>Search</title>
        </Head>
        <h2>List of organisations:</h2>

        {/* <p>Filter by tag</p>
        <div>
          <button onClick={clear}>clear filter</button>
        </div>
        <button value="offline" onClick={search}>
          offline
        </button>
        <button value="digital" onClick={search}>
          digital
        </button>
        <button value="anxiety" onClick={search}>
          anxiety
        </button> */}

        <div>
          {resources.map((resource) => (
            // <Link href={`/users/${user.id}`}>
            //   <a>
            //     {user.firstName} {user.lastName}
            //   </a>
            // </Link>
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
  const resources = await getResources();
  const user = await getUserBySessionToken(token);
  return { props: { loggedIn, resources, user } };
}
