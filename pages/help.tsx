import { NextPage } from "next";
import Layout from "../components/Layout";
import Link from "next/link";

const Help: NextPage = () => (
  <Layout title="FAQ">
    <h1>Help Page</h1>
    <Link href="/">
      <a>Home</a>
    </Link>
  </Layout>
);

export default Help;
