import { FunctionComponent } from "react";
import Link from "next/link";
import Head from "next/head";
import "../style.less";
import "react-skeleton-css/styles/skeleton.2.0.4.css";

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
    <div className="wrapper">
      <header>
        <nav>
          <div>
            <Link href="/">
              <a tabIndex={-1}>Home</a>
            </Link>
            <Link href="/about">
              <a tabIndex={-1}>About</a>
            </Link>
            <Link href="/help">
              <a tabIndex={-1}>Help</a>
            </Link>
          </div>
        </nav>
      </header>
      <div className="container">{children}</div>
      <footer>
        <hr />
        <p>I'll fill it later with something more inforamtive.</p>
      </footer>
    </div>
  </div>
);

export default Layout;
