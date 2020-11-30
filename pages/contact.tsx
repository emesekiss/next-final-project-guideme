/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import type {} from '@emotion/react/types/css-prop';
import Layout from '../components/Layout';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { isSessionTokenValid } from '../util/auth';
import nextCookies from 'next-cookies';
import { User } from '../util/types';
import { getUserBySessionToken } from '../util/database';
import { boxStyles } from '../styles/styles';

type Props = { loggedIn: boolean; user: User };

export default function Contact({ loggedIn, user }: Props) {
  return (
    <div>
      <Layout loggedIn={loggedIn} user={user}>
        <Head>
          <title>Contact</title>
        </Head>
        <form name="contact" method="POST" data-netlify="true">
          <div css={boxStyles}>
            <h2>Contact Form</h2>

            <input
              title="username"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
            />
            <input
              title="e-mail address"
              type="text"
              id="email"
              name="email"
              placeholder="Email address"
            />
            <textarea
              title="message"
              id="message"
              name="message"
              placeholder="Write your message"
            ></textarea>
            <button type="submit">Send message</button>
          </div>
        </form>
      </Layout>
    </div>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  const user = await getUserBySessionToken(token);
  return { props: { loggedIn, user } };
}
