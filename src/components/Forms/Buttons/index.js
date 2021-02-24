import React from "react";
import "./styles.scss";

const Button = ({ children, ...otherProps }) => {
  return (
    <button {...otherProps} className="btn">
      {children}
    </button>
  );
};

// into Sign in page
export default Button;
