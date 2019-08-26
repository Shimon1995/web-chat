import { NextPage } from "next";
import Layout from "../components/Layout";
import Link from "next/link";

const Home: NextPage = () => (
  <Layout title="Home">
    <div className="center">
      <h1>Welcome here!</h1>
      <h3>Why to use this chat</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
        labore ducimus! Rem optio voluptate veniam!
      </p>
      <h3>What's the main idea</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore tenetur
        provident placeat qui earum saepe rerum ut sed facilis animi aut eos
        corporis.
      </p>
      <Link href="/chat">
        <input type="button" value="Start the chat" />
      </Link>
      <br />
      <span>Go to the about page:</span>
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  </Layout>
);

export default Home;
