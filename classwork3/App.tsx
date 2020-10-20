import React from "react";
import "./App.css";
import Repositories from "./Repositories";
import RepositoriesHooks from "./RepositoriesHooks";

function App() {
  return (
    <div className="container">
      <div className="App">
        <h1>sindresorhus' Github repos with HOC</h1>
        <Repositories />
      </div>

      <div className="App">
        <h1>sindresorhus' Github repos with Hooks</h1>
        <RepositoriesHooks />
      </div>
    </div>
  );
}

export default App;
