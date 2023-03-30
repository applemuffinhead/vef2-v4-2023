import React from "react";

function Layout({ header, footer, children }) {
  return (
    <div className="App">
      {header}
      {children}
      {footer}
    </div>
  );
}

export default Layout;
