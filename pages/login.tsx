/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import type {} from '@emotion/react/types/css-prop';
import Link from 'next/link';
import Layout from '../components/Layout';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import { isSessionTokenValid } from '../util/auth';
import { boxStyles } from '../styles/styles';

type Props = { loggedIn: boolean; redirectDestination: string };

export default function Login({ loggedIn, redirectDestination }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <Layout loggedIn={loggedIn} user={null}>
      <Head>
        <title>Login</title>
      </Head>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
          const { success } = await response.json();

          if (!success) {
            setErrorMessage('Login failed!');
          } else {
            setErrorMessage('');
            router.push(redirectDestination);
          }
        }}
      >
        <div css={boxStyles}>
          <h2>Login</h2>
          <input
            data-cy="username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            placeholder="Username"
          />
          <input
            data-cy="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Password"
          />
          <button data-cy="login">Log in</button>
          <p style={{ color: 'red' }}>{errorMessage}</p>
          <p>
            Need an account?{' '}
            <Link href="/register">
              <a>Register here</a>
            </Link>
          </p>
        </div>
      </form>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);

  const redirectDestination = context?.query?.returnTo ?? '/profile';

  if (await isSessionTokenValid(token)) {
    return {
      redirect: {
        destination: redirectDestination,
        permanent: false,
      },
    };
  }

  return {
    props: { loggedIn: false, redirectDestination: redirectDestination },
  };
}
