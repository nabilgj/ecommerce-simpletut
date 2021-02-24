import React from "react";
import "./styles.scss";

const Buttons = ({ children, ...otherProps }) => {
  return (
    <button {...otherProps} className="btn">
      {children}
    </button>
  );
};

// into Sign in page
export default Buttons;
