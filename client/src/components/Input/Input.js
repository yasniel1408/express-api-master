import React from "react";
import "./Input.css";

const Input = ({ text, name, placeholder, required = false, type }) => {
  return (
    <div>
      <label htmlFor={name}>
        <b>{text}</b>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        required={required}
      />
    </div>
  );
};

export default Input;
