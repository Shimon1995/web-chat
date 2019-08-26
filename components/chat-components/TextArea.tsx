import { FunctionComponent } from "react";
import { Dialogue, State } from "../types";
import uid from "uniqid";
import { connect } from "react-redux";

interface Props {
  chat: Dialogue[];
}

const TextArea: FunctionComponent<Props> = ({ chat }) => (
  <ul className="textArea">
    {chat.map(({ name, msg }: Dialogue) => (
      <li
        key={uid()}
        style={name == "Me" ? myMessageStyle : companionMessageStyle}
      >
        {name}
        <br />
        {msg}
      </li>
    ))}
  </ul>
);
function mapStateToProps(state: State) {
  const { chat } = state;
  return {
    chat
  };
}

const myMessageStyle = {
  color: "white",
  width: "50px",
  margin: 10,
  marginLeft: 200,
  paddingLeft: 60,
  paddingRight: 50,
  borderRadius: "5%",
  backgroundColor: "rgb(0, 194, 242)"
};

const companionMessageStyle = {
  width: "50px",
  margin: 10,
  marginRight: 200,
  paddingRight: 60,
  paddingLeft: 50,
  borderRadius: "5%",
  backgroundColor: "white"
};

export default connect(mapStateToProps)(TextArea);
