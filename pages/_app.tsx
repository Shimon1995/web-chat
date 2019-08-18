import React from "react";
import App, { Container } from "next/app";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";

class MyApp extends App<any, any> {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
