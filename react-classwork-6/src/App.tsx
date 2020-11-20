import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./ErrorBoundary";
import Home from "./Home";
import MemoExample from "./MemoExample";
import NavBar from "./NavBar";

// lazy load

const Repositories = lazy(() => import("./Repositories"));
const ItemDetail = lazy(() => import("./ItemDetail"));
const RepositoriesHooks = lazy(() => import("./RepositoriesHooks"));

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <Suspense fallback={<h1>Loading Route ...</h1>}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/hoc" exact component={Repositories} />
            <Route path="/hoc/:id" component={ItemDetail} />
            <Route path="/hook" component={RepositoriesHooks} />
            <Route path="/hook/:id" component={ItemDetail} />
            <Route path="/memo" >
              <ErrorBoundary>
                <MemoExample/>
              </ErrorBoundary>
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
