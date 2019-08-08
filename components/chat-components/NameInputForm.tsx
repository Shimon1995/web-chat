import { FunctionComponent, FormEventHandler } from "react";

interface Props {
  input: string;
  onChangeInput: FormEventHandler;
  onChangeName: FormEventHandler;
}

const NameInputForm: FunctionComponent<Props> = ({
  input,
  onChangeInput,
  onChangeName
}) => (
  <form onSubmit={e => onChangeName(e)}>
    <input type="text" value={input} onChange={e => onChangeInput(e)} />
    <input type="button" value="Submit" />
  </form>
);

export default NameInputForm;
