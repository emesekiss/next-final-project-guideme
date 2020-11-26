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

type Props = { loggedIn: boolean; user: User };

const contactFormStyles = css`
  text-align: center;
  border: 1px solid #1564d1;
  border-radius: 8px;
  input,
  textarea {
    min-height: 60px;
    margin-bottom: 20px;
    border: 3px solid #f5f1ed;
    border-radius: 10px;
    background-color: #fff;
    font-size: 16px;
    font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, Segoe UI,
      Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
      sans-serif;
  }
  h2 {
    font-size: 32px;
  }
  form {
    display: block;
    text-align: center;
  }
`;

export default function Contact({ loggedIn, user }: Props) {
  return (
    <div>
      <Layout loggedIn={loggedIn} user={user}>
        <Head>
          <title>Contact</title>
        </Head>
        <div css={contactFormStyles}>
          <h2>Contact Form</h2>
          <form name="contact" method="POST" data-netlify="true">
            <input type="text" id="name" name="name" placeholder="Name" />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email address"
            />
            <textarea
              id="message"
              name="message"
              placeholder="Write your message"
            ></textarea>
            <p>
              <button type="submit">Send message</button>
            </p>
          </form>
        </div>
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
