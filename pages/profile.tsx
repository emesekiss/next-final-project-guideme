/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import type {} from '@emotion/react/types/css-prop';
import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { isSessionTokenValid } from '../util/auth';
import Layout from '../components/Layout';
import {
  getSavedResourcesByUserId,
  getUserBySessionToken,
} from '../util/database';
import { User } from '../util/types';
import { useState } from 'react';
import AvatarSelect from '../components/AvatarSelect';
import { cardStyles, actionItemsWrapper } from './resources/[id]';

type Props = { user: User; loggedIn: boolean; savedResources: [] };
type Resource = {
  id: number;
  name: string;
  image: string;
  description: string;
  contact: string;
};

const productStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 25px;
  column-gap: 25px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 50px;
    column-gap: 100px;
  }
`;

const profileStyles = css`
  color: #252525;
  letter-spacing: 1px;
`;

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
      <div css={profileStyles}>
        <h1>Profile</h1>
        <h3>Saved resources</h3>
      </div>
      <div css={productStyles}>
        {savedResources &&
          savedResources.map((resource: Resource) => (
            <div css={cardStyles} key={resource.id}>
              <img src={`/resources/${resource.image}`} />
              <h5>{resource.name}</h5>
              <p>{resource.description}</p>
              <div css={actionItemsWrapper}>
                <a href={resource.contact}>CONTACT</a>
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
                  DELETE
                </button>
              </div>
            </div>
          ))}
      </div>
      <div css={profileStyles}>
        <h3>Edit profile</h3>
      </div>
      <p>Username:</p>

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
      <p>Avatar:</p>
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
  let savedResources;
  const user = await getUserBySessionToken(token);
  const loggedIn = await isSessionTokenValid(token);

  if (user) {
    savedResources = await getSavedResourcesByUserId(user.id);
  }

  return { props: { user, loggedIn, savedResources } };
}
