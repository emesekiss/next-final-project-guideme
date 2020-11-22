import Layout from '../components/Layout';
import Head from 'next/head';
import { isSessionTokenValid } from '../util/auth';
import nextCookies from 'next-cookies';
import { useState } from 'react';
import { getUserBySessionToken } from '../util/database';

const choices = [
  { label: 'anxiety', linkTo: '/anxiety' },
  { label: 'lowMood', linkTo: '/contact' },
];

export default function Guide({ loggedIn, user }) {
  const [filteredchoices, setFilteredchoices] = useState(null);

  const search = (e) => {
    const filtered = choices.filter((cho) =>
      cho.label.some((i) => i === e.target.value),
    );
    setFilteredchoices(filtered);
  };

  return (
    <div>
      <Layout loggedIn={loggedIn} user={user}>
        <Head>
          <title>Guide</title>
        </Head>
        <h2>welcome</h2>
        <h3>I want help with...</h3>
        <div>
          <a href="/anxiety" value="anxiety" onClick={search}>
            anxiety
          </a>
        </div>
        <div>
          <a>low mood</a>
        </div>
        <div>
          <a>self-harm</a>
        </div>
      </Layout>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  const user = await getUserBySessionToken(token);
  return { props: { loggedIn, user } };
}
