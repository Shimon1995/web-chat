import {
  FunctionComponent,
  FormEventHandler,
  useEffect,
  createRef,
  RefObject
} from "react";
import { changeNameInput, changeName } from "../../store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { State } from "../types";

interface Props {
  txtinp: RefObject<HTMLInputElement>;
  input: string;
  changeNameInput: FormEventHandler;
  changeName: FormEventHandler;
}

const NameInputForm: FunctionComponent<Props> = ({
  txtinp,
  input,
  changeNameInput,
  changeName
}) => {
  const inp: RefObject<HTMLInputElement> = createRef();
  useEffect(() => inp.current.focus());
  return (
    <form
      className="nameForm"
      onSubmit={e => {
        e.preventDefault();
        txtinp.current.focus();
        changeName(e);
      }}
    >
      <input
        ref={inp}
        className="text"
        type="text"
        value={input}
        onChange={changeNameInput}
        placeholder="Enter Your Name"
      />
    </form>
  );
};

function mapStateToProps(state: State) {
  const { input, txtinp } = state;
  return {
    txtinp,
    input
  };
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeNameInput, changeName }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameInputForm);
