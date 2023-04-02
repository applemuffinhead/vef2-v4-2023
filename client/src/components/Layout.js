import React from "react";
import "../styles/Layout.css";

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
