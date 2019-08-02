import { FunctionComponent } from "react";
import { Dialogue } from "../types";
import uid from "uniqid";

interface Props {
  messages: Dialogue[];
}

const TextArea: FunctionComponent<Props> = ({ messages }) => (
  <ul>
    {messages.map(({ name, msg }: Dialogue) => (
      <li key={uid()}>
        {name}
        <br />
        {msg}
      </li>
    ))}
  </ul>
);

export default TextArea;
