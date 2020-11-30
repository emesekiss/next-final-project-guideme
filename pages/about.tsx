/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Layout from '../components/Layout';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { isSessionTokenValid } from '../util/auth';
import nextCookies from 'next-cookies';
import { User } from '../util/types';
import { getUserBySessionToken } from '../util/database';

type Props = { loggedIn: boolean; user: User };

const aboutStyles = css`
  h1 {
    text-align: center;
  }
  p,
  a {
    text-align: center;
    margin: 10px 0;
  }
  a {
    text-decoration: underline;
  }

  img {
    width: 250px;
    height: auto;
    margin: 10px;
  }
  @media screen and (min-width: 768px) {
    img {
      margin: 10px;
    }
    div {
      display: flex;
      justify-content: space-around;
    }
  }
`;

export default function About({ loggedIn, user }: Props) {
  return (
    <div>
      <Layout loggedIn={loggedIn} user={user}>
        <Head>
          <title>About Us</title>
        </Head>
        <div css={aboutStyles}>
          <h1>Good mental health for all </h1>

          <p>
            Our mission is to help people understand, protect and sustain their
            mental health.
          </p>
          <p>
            Get resources to support you. It's easy: the guide will ask you
            simple questions. Once you’ve answered our algorithm does the rest
            and in seconds, you’ll have your resources and apps picked for you.
            The resources are tailored just for you and based on your answers to
            the questions we think these will be most helpful to you. If you’re
            unsure about any of the suggestions, you can visit the ‘search’ page
            to browse and filter from all the resources. Once you’ve found a
            resource you like you can click ‘save’ and we will store this result
            on your profile page. This option is only available to registered
            users, so don't forget to make an account. Most of our resources and
            apps we are able to offer for free. GuideMe is available to you 24/7
            on any device and is completely anonymous.
          </p>
          <div>
            <img
              alt="group of people standing and sitting together"
              src="/us.svg"
            />
            <p>
              If you need urgent support <a href="/urgent">click here.</a>
            </p>
          </div>
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
