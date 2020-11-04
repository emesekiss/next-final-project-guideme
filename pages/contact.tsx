import Layout from '../components/Layout';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { isSessionTokenValid } from '../util/auth';
import nextCookies from 'next-cookies';

type Props = { loggedIn: boolean };

export default function Contact({ loggedIn }: Props) {
  return (
    <div>
      <Layout loggedIn={loggedIn}>
        <Head>
          <title>Contact</title>
        </Head>
        <h2>Contact Form</h2>
      </Layout>
    </div>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  return { props: { loggedIn } };
}
