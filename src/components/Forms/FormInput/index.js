import React from "react";
import "./styes.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="formRow">
      {label && <label>{label}</label>}

      <input className="formInput" onChange={handleChange} {...otherProps} />
    </div>
  );
};

// into SignUp and SignIn
export default FormInput;
