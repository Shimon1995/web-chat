import { FunctionComponent } from "react";
import Link from "next/link";
import Head from "next/head";
import "../style.less";

type Props = {
  title?: string;
};

const Layout: FunctionComponent<Props> = ({ children, title = "Untitled" }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/help">
          <a>Help</a>
        </Link>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <p>I'll fill it later with something more inforamtice.</p>
    </footer>
  </div>
);

export default Layout;
