import React from "react";
import "./Input.css";

function Input({
  tipo = "text",
  nombreCampo,
  onInput = () => {},
  placeholder,
}) {
  return (
    <input
      type={tipo}
      name={nombreCampo}
      className="form-control"
      placeholder={placeholder}
      onInput={onInput}
    />
  );
}

export default Input;
