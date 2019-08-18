export interface State {
  input: string;
  chat: Dialogue[];
  message: Dialogue;
}

export interface Dialogue {
  name: string;
  msg: string;
}
