import React from "react";

const Button = ({ children, onClick, type = "button", ...otherProps }) => {
  return (
    <button type={type} onClick={onClick} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
