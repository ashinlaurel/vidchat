import React from "react";
import "./App.css";
import Join from "./Components/Join";
import Chat from "./Components/Chat";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    // <div className="App">
    //   <Join />
    // </div>
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
}

export default App;
