import React from "react";
import './Button.css'

const Button = ({text, onclick, classbtn, type="button"}) => {
  return (
    <button
      type={type}
      onClick={onclick}
      className={"mybutton "+classbtn}
    >
      {text}
    </button>
  );
};

export default Button;
