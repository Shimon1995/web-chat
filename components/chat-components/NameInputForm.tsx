import { FunctionComponent, FormEventHandler } from "react";
import { changeNameInput, changeName } from "../../store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

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
  <form onSubmit={changeName}>
    <input type="text" value={input} onChange={changeNameInput} />
    <input type="button" value="Submit" />
  </form>
);

function mapStateToProps(state) {
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
