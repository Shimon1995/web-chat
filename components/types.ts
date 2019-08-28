import { RefObject } from "react";

export interface State {
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
