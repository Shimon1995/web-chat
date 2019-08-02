import { FunctionComponent, FormEventHandler } from "react";
import { Dialogue } from "../types";

interface Props {
  message?: Dialogue;
  onInput: FormEventHandler;
  onSend: FormEventHandler;
}

const Input: FunctionComponent<Props> = ({ message, onInput, onSend }) => (
  <form onSubmit={e => onSend(e)}>
    <input type="text" value={message.msg} onChange={e => onInput(e)} />
    <input type="button" value="Send" />
  </form>
);

export default Input;
