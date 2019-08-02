import { Component, FormEvent } from "react";
import Layout from "../components/Layout";
import InputField from "../components/chat-components/InputField";
import TextArea from "../components/chat-components/TextArea";
import io from "socket.io-client";
import { Dialogue } from "../components/types";

interface State {
  socket: SocketIOClient.Socket;
  chat: Dialogue[];
  message: Dialogue;
}

class Chat extends Component<void, State> {
  state = {
    socket: io(),
    chat: [],
    message: {
      name: "Brad",
      msg: ""
    }
  };
  componentDidMount(): void {
    const { socket, message } = this.state;
    socket.on("message", (mssg: Dialogue) => {
      this.setState({
        chat: [...this.state.chat, mssg],
        message: { name: message.name, msg: "" }
      });
    });
  }
  componentWillUnmount(): void {
    this.state.socket.disconnect();
  }
  render() {
    return (
      <Layout title="Chat">
        <div className="chat">
          <h1>Chat Application</h1>
          <TextArea messages={this.state.chat} />
          <InputField
            message={this.state.message}
            onInput={this.takeInput.bind(this)}
            onSend={this.sendMessage.bind(this)}
          />
        </div>
      </Layout>
    );
  }
  takeInput(event: FormEvent<HTMLInputElement>): void {
    this.setState({
      message: { name: this.state.message.name, msg: event.currentTarget.value }
    });
  }
  sendMessage(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { message, socket, chat } = this.state;
    socket.emit("msg", message);
    this.setState({
      chat: [...chat, { name: "Me", msg: message.msg }],
      message: { name: message.name, msg: "" }
    });
  }
}

export default Chat;
