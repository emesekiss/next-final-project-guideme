import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { User } from '../../util/types';

type Props = {
  user: User;
};

export default function SingleUser(props: Props) {
  // Tell TypeScript that this state variable may also
  // be a string in the future
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const [username, setUsername] = useState(props.user?.username);

  // const user = users.find((currentUser) => {
  //   if (currentUser.id === props.id) {
  //     return true;
  //   }
  //   return false;
  // });

  if (!props.user) {
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
    <Layout>
      <Head>
        <title>Single User</title>
      </Head>
      user id: {props.user.id}
      <br />
      <h2>user: {props.user.username}</h2>
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
              await fetch(`/api/users/${props.user.id}`, {
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
              setUsername(props.user.username);
            }}
          >
            cancel
          </button>
        </>
      )}
      <br />
      <button
        onClick={async () => {
          const answer = window.confirm(
            `Really delete user ${props.user.username}?`,
          );

          if (answer === true) {
            await fetch(`/api/users/${props.user.id}`, { method: 'DELETE' });

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

// This is run by Next.js BEFORE the component
// above is run, and passes in the props
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // context = {
  //   query: { id: '1' },
  //   params: { id: '1' },
  // }
  const id = context.query.id as string;

  // import { users } from '../../util/database';
  const { getUserById } = await import('../../util/database');
  const user = await getUserById(id);

  // TODO: Don't do this in getServerSideProps
  // updateUserById(id, { firstName: 'Evan' });

  const props: { user?: User } = {};
  if (user) props.user = user;

  return {
    props: props,
  };
}
