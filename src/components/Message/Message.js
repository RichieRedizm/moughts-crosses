import './Message.css';

export const Message = ({ type, msgText }) => {
  return <div className={`message ${type}`}>{msgText}</div>;
};
