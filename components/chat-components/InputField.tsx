import { Component, FormEvent, FormEventHandler } from "react";
import { connect } from "react-redux";
import {
  takeInput,
  sendMessage,
  receiveMessage,
  chatChange
} from "../../store";
import { RefObject } from "react";
import { Dialogue, State as GlobalState } from "../types";
import { bindActionCreators } from "redux";
import io from "socket.io-client";

interface State {
  socket: any;
}

interface Props {
  wait: boolean;
  disconnectBtn: RefObject<HTMLInputElement>;
  txtinp: RefObject<HTMLInputElement>;
  text: RefObject<HTMLElement>;
  chat: Dialogue[];
  message?: Dialogue;
  takeInput: FormEventHandler;
  sendMessage: FormEventHandler;
  receiveMessage: any;
  chatChange: any;
}

class Input extends Component<Props, State> {
  state = {
    socket: io()
  };
  componentDidMount(): void {
    this.state.socket.on("ChangeRoom", () => {
      this.props.chatChange();
    });

    this.props.disconnectBtn.current.onclick = () =>
      this.state.socket.disconnect();

    this.state.socket.on("s", (room: number) =>
      console.log(`You're in room ${room}`)
    );

    this.state.socket.on("message", (mssg: Dialogue) => {
      this.props.receiveMessage(mssg);
      this.props.txtinp.current.focus();
      setTimeout(() => this.props.text.current.click(), 0.00001);
    });
  }
  componentWillUnmount(): void {
    this.state.socket.disconnect();
  }
  render() {
    const { txtinp, message, takeInput, sendMessage } = this.props;
    return (
      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (message.msg !== "") {
            sendMessage(event);
            this.state.socket.emit("msg", message);
            setTimeout(() => this.props.text.current.click(), 0.00001);
          }
        }}
        className="inputForm"
      >
        <input
          className="text"
          type="text"
          value={message.msg}
          onChange={takeInput}
          placeholder="Your message goes here"
          ref={txtinp}
        />
        <input
          tabIndex={-1}
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
  const { disconnectBtn, txtinp, input, message, chat, text, wait } = state;
  return {
    disconnectBtn,
    txtinp,
    input,
    message,
    chat,
    text,
    wait
  };
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { takeInput, sendMessage, receiveMessage, chatChange },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input);
