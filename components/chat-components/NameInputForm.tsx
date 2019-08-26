import { FunctionComponent, FormEventHandler } from "react";
import { changeNameInput, changeName } from "../../store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { State } from "../types";

interface Props {
  input: string;
  changeNameInput: FormEventHandler;
  changeName: FormEventHandler;
}

const NameInputForm: FunctionComponent<Props> = ({
  input,
  changeNameInput,
  changeName
}) => (
  <form className="nameForm" onSubmit={changeName}>
    <input
      className="text"
      type="text"
      value={input}
      onChange={changeNameInput}
      placeholder="Enter Your Name"
    />
  </form>
);

function mapStateToProps(state: State) {
  const { input } = state;
  return {
    input
  };
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeNameInput, changeName }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameInputForm);
