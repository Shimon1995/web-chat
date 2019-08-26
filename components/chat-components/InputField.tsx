import { Component, FormEvent, FormEventHandler } from "react";
import { connect } from "react-redux";
import { takeInput, sendMessage, receiveMessage } from "../../store";
import { Dialogue, State as GlobalState } from "../types";
import { bindActionCreators } from "redux";
import io from "socket.io-client";

interface State {
  socket: any;
}

interface Props {
  chat: Dialogue[];
  message?: Dialogue;
  takeInput: FormEventHandler;
  sendMessage: FormEventHandler;
  receiveMessage: any;
}

class Input extends Component<Props, State> {
  state = {
    socket: io()
  };
  componentDidMount(): void {
    this.state.socket.on("message", (mssg: Dialogue) => {
      this.props.receiveMessage(mssg);
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
          event.preventDefault();
          if (message.msg !== "") {
            this.state.socket.emit("msg", message);
            sendMessage(event);
          }
        }}
        className="inputForm"
      >
        {/* <input type="button" value="Disconnect" /> */}
        <input
          className="text"
          type="text"
          value={message.msg}
          onChange={takeInput}
          placeholder="Your message goes here"
        />
        <input
          className="button button-primary"
          type="button"
          value="Send"
          onClick={(event: FormEvent<HTMLInputElement>) => {
            if (message.msg !== "") {
              this.state.socket.emit("msg", message);
              sendMessage(event);
            }
            event.preventDefault();
          }}
        />
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
  bindActionCreators({ takeInput, sendMessage, receiveMessage }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input);
