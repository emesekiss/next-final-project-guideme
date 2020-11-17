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
        <form name="contact" method="POST" data-netlify="true">
          <p>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </p>
          <p>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" />
          </p>
          <p>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message"></textarea>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </Layout>
    </div>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  return { props: { loggedIn } };
}
