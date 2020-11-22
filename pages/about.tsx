import Layout from '../components/Layout';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { isSessionTokenValid } from '../util/auth';
import nextCookies from 'next-cookies';
import { User } from '../util/types';
import { getUserBySessionToken } from '../util/database';

type Props = { loggedIn: boolean; user: User };

export default function About({ loggedIn, user }: Props) {
  return (
    <div>
      <Layout loggedIn={loggedIn} user={user}>
        <Head>
          <title>About Us</title>
        </Head>
        <h2>Info about the team</h2>
        <h5>Good mental health for all </h5>

        <p>
          Our mission is to help people understand, protect and sustain their
          mental health.
        </p>
        <p>
          Get resources to support you The guide will ask you simple questions.
          Once you’ve answered our algorithm does the rest and in seconds,
          you’ll have your resources and apps picked for you. The resources are
          tailored just for you and based on your answers to the questions we
          think these will be most helpful to you. If you’re unsure about any of
          the suggestions, you can visit the ‘search’ page to browse and filter
          from all the resources. Once you’ve found a resource you like you can
          click ‘save’ and we will store this result to your profile page. Most
          of our resources and apps we are able to offer for free. GuideMe is
          available to you 24/7 on any device and is completely anonymous. If
          you need urgent support click here.
        </p>

        <img src="/us.svg" />
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
