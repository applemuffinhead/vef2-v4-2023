import React from "react";

const Form = ({ children, onSubmit, ...otherProps }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} {...otherProps}>
      {children}
    </form>
  );
};

export default Form;
