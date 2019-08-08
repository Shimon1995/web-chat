import NameInputForm from "../components/chat-components/NameInputForm";
import InputField from "../components/chat-components/InputField";
import TextArea from "../components/chat-components/TextArea";
import { Dialogue } from "../components/types";
import { Component, FormEvent } from "react";
import Layout from "../components/Layout";
import io from "socket.io-client";

interface State {
  input: string;
  socket: SocketIOClient.Socket;
  chat: Dialogue[];
  message: Dialogue;
}

class Chat extends Component<void, State> {
  state = {
    input: "",
    socket: io(),
    chat: [],
    message: {
      name: "",
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
          {this.state.message.name === "" && (
            <NameInputForm
              input={this.state.input}
              onChangeInput={this.changeNameInput.bind(this)}
              onChangeName={this.changeName.bind(this)}
            />
          )}
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
  changeNameInput(event: FormEvent<HTMLInputElement>): void {
    this.setState({ input: event.currentTarget.value });
  }
  changeName(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    this.setState({ message: { name: this.state.input, msg: "" }, input: "" });
  }
  takeInput(event: FormEvent<HTMLInputElement>): void {
    const { value } = event.currentTarget;
    const n = this.state.message.name;
    this.setState({
      message: { name: n === "" ? "User" : n, msg: value }
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
