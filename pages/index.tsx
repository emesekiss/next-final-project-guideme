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
import { linkStyles } from '../styles/styles';

type Props = { loggedIn: boolean; user: User };

const homeStyles = css`
  h1 {
    font-size: 48px;
    text-align: center;
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

  p {
    margin-bottom: 100px;
    text-align: center;
  }
`;

const sectionWrapperStyles = css`
  display: flex;
  justify-content: space-evenly;
`;

export default function Home({ loggedIn, user }: Props) {
  return (
    <Layout loggedIn={loggedIn} user={user}>
      <Head>
        <title>GuideMe</title>
      </Head>
      <div css={homeStyles}>
        <h1>Welcome to GuideMe</h1>
        <div css={sectionWrapperStyles}>
          <img
            alt="drawn woman standing and pointing at the text"
            src="/guide1.svg"
          />
          <p>
            GuideMe can help you find mental wellbeing apps and resources that
            are the best for you. It will ask you simple questions and based on
            your selected answers will show tailored resources to support you.
          </p>
          <img alt="drawn woman standing and smiling" src="/guide2.svg" />
        </div>
        <div css={sectionWrapperStyles}>
          <a css={linkStyles} href="/guide/1">
            GUIDE
          </a>
          <a css={linkStyles} href="/about">
            ABOUT US
          </a>
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
