import { NextPage } from "next";
import NameInputForm from "../components/chat-components/NameInputForm";
import InputField from "../components/chat-components/InputField";
import TextArea from "../components/chat-components/TextArea";
import { Dialogue, State } from "../components/types";
import Layout from "../components/Layout";
import { connect } from "react-redux";

interface Props {
  message: Dialogue;
  chat: Dialogue[];
}

const Chat: NextPage<Props> = ({ message }) => (
  <Layout title="Chat">
    <div className="chat">
      <h1>Chat Application</h1>
      {message.name === "" && <NameInputForm />}
      <TextArea />
      <InputField />
    </div>
  </Layout>
);

function mapStateToProps(state: State) {
  const { message } = state;
  return { message };
}
export default connect(mapStateToProps)(Chat);
