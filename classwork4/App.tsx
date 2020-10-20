import React from "react";
import "./App.css";
import Repositories from "./Repositories";
import RepositoriesHooks from "./RepositoriesHooks";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import ItemDetail from "./ItemDetail";

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/hoc' exact component={Repositories}/>
          <Route path='/hoc/:id' component={ItemDetail}/>
          <Route path='/hook' component={RepositoriesHooks}/>
          <Route path='/hook/:id' component={ItemDetail}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
