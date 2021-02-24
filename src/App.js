import React from "react";
import "./basic.scss";

import Header from "./components/Header";
import Homepage from "./pages/HomePage";

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Homepage />
      </div>
    </div>
  );
};

export default App;
