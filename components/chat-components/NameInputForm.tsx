import {
  FunctionComponent,
  FormEventHandler,
  useEffect,
  createRef,
  RefObject
} from "react";
import { changeNameInput, changeName, disconnect } from "../../store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { State, Dialogue } from "../types";

interface Props {
  disconnectBtn: RefObject<HTMLInputElement>;
  message: Dialogue;
  txtinp: RefObject<HTMLInputElement>;
  input: string;
  changeNameInput: FormEventHandler;
  changeName: FormEventHandler;
  disconnect: any;
}

const NameInputForm: FunctionComponent<Props> = ({
  disconnectBtn,
  txtinp,
  input,
  changeNameInput,
  changeName,
  message,
  disconnect
}) => {
  const { name } = message;
  const inp: RefObject<HTMLInputElement> = createRef();
  useEffect(() => {
    if (name === "") inp.current.focus();
  });
  return (
    <div>
      <form
        style={name !== "" ? { display: "none" } : {}}
        className="nameForm"
        onSubmit={e => {
          e.preventDefault();
          txtinp.current.focus();
          changeName(e);
        }}
      >
        <input
          ref={inp}
          type="text"
          value={input}
          onChange={changeNameInput}
          placeholder="Enter Your Name"
        />
      </form>
      <input
        style={name === "" ? { display: "none" } : {}}
        ref={disconnectBtn}
        onClick={disconnect}
        type="button"
        value="Disconnect"
        className="text space"
        tabIndex={-1}
      />
    </div>
  );
};

function mapStateToProps(state: State) {
  const { disconnectBtn, input, txtinp, message } = state;
  return {
    disconnectBtn,
    txtinp,
    input,
    message
  };
}
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ changeNameInput, changeName, disconnect }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameInputForm);
