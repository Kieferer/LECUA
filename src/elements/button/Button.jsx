import './button.css';
const Button = ({label}) => {
  return (
    <button className={"button-body"}>
      {label}
    </button>
  )
}

export default Button;