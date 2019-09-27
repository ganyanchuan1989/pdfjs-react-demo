import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import AppPost from "./AppPost";
import "./index.css";

ReactDOM.render(
  <AppPost url="http://127.0.0.1:8088/pdf/2.pdf" />,
  document.getElementById("root")
);
