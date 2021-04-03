import { ValidationMessageProps } from '../interfaces';

const ValidationMessage = ({ message }: ValidationMessageProps) => {
  return <div className="alert alert-danger">{message}</div>;
};
export default ValidationMessage;
