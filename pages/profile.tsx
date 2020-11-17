import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { isSessionTokenValid } from '../util/auth';
import Layout from '../components/Layout';
import { getUserBySessionToken } from '../util/database';
import { User } from '../util/types';
import { useState } from 'react';

type Props = { user: User; loggedIn: boolean };

export default function Profile({ user, loggedIn }: Props) {
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const [username, setUsername] = useState(user?.username);

  if (!user) {
    return (
      <Layout>
        <Head>
          <title>User not found</title>
        </Head>
        User not found.
      </Layout>
    );
  }
  return (
    <Layout loggedIn={loggedIn}>
      <Head>
        <title>Profile</title>
      </Head>
      <h1>Profile</h1>
      <h2>Username:{username}</h2>

      {editingKey === 'username' ? (
        <input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      ) : (
        username
      )}
      {editingKey !== 'username' ? (
        <button
          onClick={() => {
            setEditingKey('username');
          }}
        >
          edit
        </button>
      ) : (
        <>
          <button
            onClick={async () => {
              await fetch(`/api/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: { username: username } }),
              });
              setEditingKey(null);
              window.location.reload();
            }}
          >
            save
          </button>
          <button
            onClick={() => {
              setEditingKey(null);
              setUsername(user.username);
            }}
          >
            cancel
          </button>
        </>
      )}
      <br />
      <button
        onClick={async () => {
          const answer = window.confirm(`Really delete user ${user.username}?`);

          if (answer === true) {
            await fetch(`/api/users/${user.id}`, { method: 'DELETE' });

            // This is just a fast way of refreshing the information
            //
            // A better version would be to save the props.user to a
            // separate state variable and then just set it here to null
            window.location.reload();
          }
        }}
        style={{
          background: 'red',
          color: 'white',
          padding: '7px 6px',
          borderRadius: 4,
          border: 0,
        }}
      >
        delete user
      </button>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);

  if (!(await isSessionTokenValid(token))) {
    return {
      redirect: {
        destination: '/login?returnTo=/profile',
        permanent: false,
      },
    };
  }

  // TODO: Actually, you could do this with one query
  // instead of two like done here
  const user = await getUserBySessionToken(token);
  const loggedIn = await isSessionTokenValid(token);

  return { props: { user, loggedIn } };
}
