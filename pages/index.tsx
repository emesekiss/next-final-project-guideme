/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import type {} from '@emotion/react/types/css-prop';
import Head from 'next/head';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';
import { GetServerSidePropsContext } from 'next';
import { User } from '../util/types';
import { getUserBySessionToken } from '../util/database';

type Props = { loggedIn: boolean; user: User };

const homeStyles = css`
  color: #252525;
  h1 {
    font-size: 48px;
    text-align: center;
    letter-spacing: 1px;
  }
  @media screen and (min-width: 768px) {
    h1 {
      font-size: 62px;
      text-align: center;
      letter-spacing: 1px;
    }
  }
  img {
    height: 100px;
    width: auto;
    margin: 0px 5px;
  }
  @media screen and (min-width: 768px) {
    img {
      height: 200px;
      width: auto;
      margin: 0px 50px;
    }
  }
  div {
    display: flex;
    justify-content: space-evenly;
  }
  p {
    align-self: center;
    margin-bottom: 100px;
    font-size: 18px;
    text-align: center;
    font-weight: 300;
  }
  a {
    border: 1px solid #1564d1;
    color: #1564d1;
    font-size: 14px;
    padding: 5px 10px;
    border-radius: 4px;
  }
  a:hover {
    background-color: #1564d1;
    color: white;
  }
`;

export default function Home({ loggedIn, user }: Props) {
  return (
    <Layout loggedIn={loggedIn} user={user}>
      <Head>
        <title>GuideMe</title>
      </Head>
      <div css={homeStyles}>
        <h1>Welcome to GuideMe</h1>
        <div>
          <img src="/guide1.svg" />
          <p>
            GuideMe can help you find mental wellbeing apps and resources that
            are the best for you. It will ask you simple questions and based on
            your selected answers will show tailored resources to support you.
          </p>
          <img src="/guide2.svg" />
        </div>
        <div>
          <a href="/guide/1">GUIDE</a>
          <a href="/about">ABOUT US</a>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  const user = await getUserBySessionToken(token);

  return { props: { loggedIn, user } };
}
