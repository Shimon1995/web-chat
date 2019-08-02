import { NextPage } from "next";
import Layout from "../components/Layout";
import Link from "next/link";

const About: NextPage = () => (
  <Layout title="Abot">
    <h1>About</h1>
    <div className="block">
      <h4>What I used during creating the application</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        quibusdam laboriosam ad, repellendus, hic facilis sunt officia unde
        voluptatibus in dolor perspiciatis, vitae deserunt.
      </p>
    </div>
    <h3>What it is maid for</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio quas
      esse quidem iusto quos atque praesentium reprehenderit, veritatis
      consequuntur{" "}
    </p>
    <h3>Who I am</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam culpa
      totam eaque, quis unde, tempora repellat cumque saepe beatae.
    </p>
    <Link href="/">
      <a>Home</a>
    </Link>
  </Layout>
);

export default About;
