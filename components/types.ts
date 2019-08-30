import { RefObject } from "react";

export interface State {
  wait: boolean;
  disconnectBtn: RefObject<HTMLInputElement>;
  txtinp: RefObject<HTMLInputElement>;
  text: RefObject<HTMLElement>;
  input: string;
  chat: Dialogue[];
  message: Dialogue;
}

export interface Dialogue {
  name: string;
  msg: string;
}
