import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { isSessionTokenValid } from '../util/auth';
import Layout from '../components/Layout';
import {
  deleteSavedResources,
  getSavedResourcesByUserId,
  getUserBySessionToken,
} from '../util/database';
import { User } from '../util/types';
import { useState } from 'react';
import AvatarSelect from '../components/AvatarSelect';
import { resourceLimits } from 'worker_threads';

type Props = { user: User; loggedIn: boolean };

export default function Profile({ user, loggedIn, savedResources }: Props) {
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const [username, setUsername] = useState(user?.username);
  const [avatar, setAvatar] = useState(user?.avatar);

  const handleSelectAvatar = async (avatarId: string) => {
    await fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { avatar: avatarId } }),
    });
    setEditingKey(null);
    setAvatar(avatarId);
    window.location.reload();
  };

  if (!user) {
    return (
      <Layout loggedIn={loggedIn} user={user}>
        <Head>
          <title>User not found</title>
        </Head>
        User not found.
      </Layout>
    );
  }
  return (
    <Layout loggedIn={loggedIn} user={user}>
      <Head>
        <title>Profile</title>
      </Head>
      <h1>Profile</h1>

      <div>
        {savedResources.map((resource) => (
          <div key={resource.id}>
            {resource.name}
            <button
              onClick={async () => {
                const answer = window.confirm(
                  `Do you really want to delete ${resource.name} from your list?`,
                );

                if (answer === true) {
                  await fetch(`/api/users/resources`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      resourceId: resource.id,
                      userId: user.id,
                    }),
                  });
                  window.location.reload();

                  // This is just a fast way of refreshing the information
                  //
                  // A better version would be to save the props.user to a
                  // separate state variable and then just set it here to null
                }
              }}
            >
              delete
            </button>
          </div>
        ))}
      </div>
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

      <img src={`/avatars/${avatar}.svg`} />
      <button
        onClick={() => {
          setEditingKey('avatar');
        }}
      >
        change
      </button>

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

      {editingKey === 'avatar' && (
        <AvatarSelect
          handleSelectAvatar={handleSelectAvatar}
          close={() => setEditingKey(null)}
        />
      )}
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
  const savedResources = await getSavedResourcesByUserId(user.id);

  return { props: { user, loggedIn, savedResources } };
}
