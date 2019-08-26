import { FormEvent } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Dialogue, State } from "./components/types";

export const exampleInitialState: State = {
  input: "",
  chat: [],
  message: {
    name: "",
    msg: ""
  }
};

// ACTION TYPES
export enum actionTypes {
  CHANGEINPUT,
  CHANGENAME,
  TAKEINPUT,
  SENDMESSAGE,
  RECEIVEMESSAGE
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  const {
    CHANGEINPUT,
    CHANGENAME,
    TAKEINPUT,
    SENDMESSAGE,
    RECEIVEMESSAGE
  } = actionTypes;
  switch (action.type) {
    case CHANGEINPUT:
      return Object.assign({}, state, {
        input: action.inp
      });
    case CHANGENAME:
      action.evt.preventDefault();
      return Object.assign({}, state, {
        message: { name: state.input, msg: "" },
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
    default:
      return state;
  }
};

// ACTIONS
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

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  );
}
