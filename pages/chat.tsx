import { NextPage } from "next";
import NameInputForm from "../components/chat-components/NameInputForm";
import InputField from "../components/chat-components/InputField";
import TextArea from "../components/chat-components/TextArea";
import { Dialogue, State } from "../components/types";
import Layout from "../components/Layout";
import { connect } from "react-redux";
import { useEffect } from "react";

interface Props {
  message: Dialogue;
  chat: Dialogue[];
  wait: boolean;
}

const Chat: NextPage<Props> = ({ wait }) => (
  <Layout title="Chat">
    <div>
      <div className="wait" style={wait ? {} : { display: "none" }}>
        <p>Wait...</p>
      </div>
      <div className="chat" style={!wait ? {} : { display: "none" }}>
        <h1>Chat Application</h1>
        <NameInputForm />
        <TextArea />
        <InputField />
      </div>
    </div>
  </Layout>
);

function mapStateToProps(state: State) {
  const { wait } = state;
  return {
    wait
  };
}

export default connect(mapStateToProps)(Chat);
