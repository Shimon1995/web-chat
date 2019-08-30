import { FormEvent, createRef } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Dialogue, State } from "./components/types";

export const exampleInitialState: State = {
  wait: true,
  disconnectBtn: createRef(),
  txtinp: createRef(),
  text: createRef(),
  input: "",
  chat: [],
  message: {
    name: "",
    msg: ""
  }
};

// ACTION TYPES
export enum actionTypes {
  CHATCHANGE,
  CHANGEINPUT,
  CHANGENAME,
  TAKEINPUT,
  SENDMESSAGE,
  RECEIVEMESSAGE,
  DISCONNECT
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  const {
    CHATCHANGE,
    CHANGEINPUT,
    CHANGENAME,
    TAKEINPUT,
    SENDMESSAGE,
    RECEIVEMESSAGE,
    DISCONNECT
  } = actionTypes;
  switch (action.type) {
    case CHATCHANGE:
      console.log("Change Room");
      return Object.assign({}, state, {
        wait: !state.wait
      });
    case CHANGEINPUT:
      return Object.assign({}, state, {
        input: action.inp
      });
    case CHANGENAME:
      return Object.assign({}, state, {
        message: { name: state.input === "Me" ? "User" : state.input, msg: "" },
        input: ""
      });
    case TAKEINPUT:
      const n = state.message.name;
      return Object.assign({}, state, {
        message: {
          name: n === "" ? "User" : n,
          msg: action.inp
        }
      });
    case SENDMESSAGE:
      action.evt.preventDefault();
      return Object.assign({}, state, {
        chat: [...state.chat, { name: "Me", msg: state.message.msg }],
        message: { name: state.message.name, msg: "" }
      });
    case RECEIVEMESSAGE:
      return Object.assign({}, state, {
        chat: [...state.chat, action.mssg],
        message: { name: state.message.name, msg: "" }
      });
    case DISCONNECT:
      confirm("Are you sure?");
      break;
    default:
      return state;
  }
};

// ACTIONS
export const chatChange = () => {
  return {
    type: actionTypes.CHATCHANGE
  };
};

export const changeNameInput = (event: FormEvent<HTMLInputElement>) => {
  return {
    type: actionTypes.CHANGEINPUT,
    inp: event.currentTarget.value
  };
};

export const changeName = (event: FormEvent<HTMLFormElement>) => {
  return {
    type: actionTypes.CHANGENAME,
    evt: event
  };
};

export const takeInput = (event: FormEvent<HTMLInputElement>) => {
  return {
    type: actionTypes.TAKEINPUT,
    inp: event.currentTarget.value
  };
};

export const sendMessage = (event: FormEvent<HTMLFormElement>) => {
  return {
    type: actionTypes.SENDMESSAGE,
    evt: event
  };
};

export const receiveMessage = (mssg: Dialogue) => {
  return {
    type: actionTypes.RECEIVEMESSAGE,
    mssg
  };
};

export const disconnect = () => {
  return {
    type: actionTypes.DISCONNECT
  };
};

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  );
}
