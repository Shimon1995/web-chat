import {
  Component,
  FormEvent,
  FormEventHandler,
  createRef,
  Ref
  // RefObject,
} from "react";
import { connect } from "react-redux";
import { takeInput, sendMessage, receiveMessage } from "../../store";
import { RefObject } from "react";
import { Dialogue, State as GlobalState } from "../types";
import { bindActionCreators } from "redux";
import io from "socket.io-client";

interface State {
  socket: any;
  // input: RefObject<HTMLInputElement>;
}

interface Props {
  txtinp: RefObject<HTMLInputElement>;
  text: RefObject<HTMLElement>;
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
        {/* <input type="button" value="Disconnect" /> */}
        <input
          className="text"
          type="text"
          value={message.msg}
          onChange={takeInput}
          placeholder="Your message goes here"
          ref={txtinp}
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
  const { txtinp, input, message, chat, text } = state;
  return {
    txtinp,
    input,
    message,
    chat,
    text
  };
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ takeInput, sendMessage, receiveMessage }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input);
