import './button.css';
const Button = ({label, action}) => {
  return (
    <button onClick={action} className={"button-body"}>
      {label}
    </button>
  )
}

export default Button;