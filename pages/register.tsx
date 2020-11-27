/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import type {} from '@emotion/react/types/css-prop';
import Layout from '../components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { boxStyles } from './contact';

type Props = { loggedIn: boolean; token: string };

export default function Register({ token, loggedIn }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <Layout loggedIn={loggedIn} user={null}>
      <Head>
        <title>Register</title>
      </Head>

      <form
        onSubmit={async (e) => {
          // Prevent the default browser behavior of forms
          e.preventDefault();

          // Send the username, password and token to the
          // API route
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
              token: token,
            }),
          });

          const { success } = await response.json();

          if (success) {
            // Redirect to the homepage if successfully registered
            router.push('/login');
          } else {
            // If the response status code (set using response.status()
            // in the API route) is 409 (Conflict) then show an error
            // message that the user already exists
            if (response.status === 409) {
              setErrorMessage('User already exists!');
            } else {
              setErrorMessage('Failed!');
            }
          }
        }}
      >
        <div css={boxStyles}>
          <h2>Register</h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            placeholder="Username"
          />

          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Password"
          />

          <button>Register</button>
          <p style={{ color: 'red' }}>{errorMessage}</p>

          <p>
            Already have an account?{' '}
            <Link href="/login">
              <a>Log in here</a>
            </Link>
          </p>
        </div>
      </form>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Import and instantiate a CSRF tokens helper
  const tokens = new (await import('csrf')).default();
  const secret = process.env.CSRF_TOKEN_SECRET;

  if (typeof secret === 'undefined') {
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured!');
  }

  // Create a CSRF token based on the secret
  const token = tokens.create(secret);

  return { props: { token } };
}
