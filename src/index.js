import React from "react";
import ReactDOM from "react-dom";
import DisplayData from "./components/DataDisplayer";

import "./styles.css";

class App extends React.Component {
  render() {
    return <DisplayData />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
