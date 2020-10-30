import Head from 'next/head';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';
import { GetServerSidePropsContext } from 'next';

type Props = { loggedIn: boolean };

export default function Home(props: Props) {
  return (
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>GuideMe</title>
      </Head>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  return { props: { loggedIn } };
}
