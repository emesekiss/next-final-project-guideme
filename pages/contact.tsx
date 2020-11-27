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

export const boxStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  color: #252525;
  button {
    border: 1px solid #1564d1;
    color: #1564d1;
    font-size: 14px;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #1564d1;
    color: white;
  }

  @media screen and (min-width: 768px) {
    input,
    textarea {
      min-width: 300px;
    }
  }
  a {
    color: #1564d1;
  }
`;

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
