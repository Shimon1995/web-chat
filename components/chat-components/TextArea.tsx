import { FunctionComponent } from "react";
import { Dialogue, State } from "../types";
import uid from "uniqid";
import { connect } from "react-redux";

interface Props {
  chat: Dialogue[];
}

const TextArea: FunctionComponent<Props> = ({ chat }) => (
  <ul>
    {chat.map(({ name, msg }: Dialogue) => (
      <li key={uid()}>
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
export default connect(mapStateToProps)(TextArea);
