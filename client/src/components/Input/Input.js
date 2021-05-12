import React from "react";
import "./Input.css";

const Input = ({
  text,
  name,
  placeholder,
  required = false,
  type,
  value,
  setValue,
}) => {
  return (
    <div>
      <label className="labelInput" htmlFor={name}>
        <b>{text}</b>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
