import { Component, FormEvent, FormEventHandler } from "react";
import { connect } from "react-redux";
import { takeInput, sendMessage, messageSocket } from "../../store";
import { Dialogue, State as GlobalState } from "../types";
import { bindActionCreators } from "redux";
import io from "socket.io-client";

interface State {
  socket: SocketIO.Client;
}

interface Props {
  chat: Dialogue[];
  message?: Dialogue;
  takeInput: FormEventHandler;
  sendMessage: FormEventHandler;
  messageSocket: any;
}

class Input extends Component<Props, State> {
  state = {
    socket: io()
  };
  componentDidMount(): void {
    this.state.socket.on("message", (mssg: Dialogue) => {
      this.props.messageSocket(mssg);
    });
  }
  componentWillUnmount(): void {
    this.state.socket.disconnect();
  }
  render() {
    const { message, takeInput, sendMessage } = this.props;
    return (
      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          this.state.socket.emit("msg", message);
          sendMessage(event);
        }}
      >
        <input type="text" value={message.msg} onChange={takeInput} />
        <input type="button" value="Send" />
      </form>
    );
  }
}

function mapStateToProps(state: GlobalState) {
  const { input, message, chat } = state;
  return {
    input,
    message,
    chat
  };
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ takeInput, sendMessage, messageSocket }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input);
