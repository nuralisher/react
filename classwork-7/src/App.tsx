import React, { lazy, Profiler, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Counter, CounterClick, CounterHover } from "./Counters";
import { CounterClickF, CounterF, CounterHoverF } from "./CountersFunc";
import ErrorBoundary from "./ErrorBoundary";
import Hero from "./Hero";
import Home from "./Home";
import MemoExample from "./MemoExample";
import NavBar from "./NavBar";

// lazy load

const Repositories = lazy(() => import("./Repositories"));
const ItemDetail = lazy(() => import("./ItemDetail"));
const RepositoriesHooks = lazy(() => import("./RepositoriesHooks"));

function App() {
  const callbackFunction = (
    id: string,
    phase: "mount" | "update",
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
    interactions: Set<{ id: number; name: string; timestamp: number }>
  ) => {
    console.log("Id is :", id);
    console.log("Phase is :", phase);
    console.log("Actual Duration is :", actualDuration);
    console.log("Base Duration is :", baseDuration);
    console.log("Start Time is :", startTime);
    console.log("Commit Time is :", commitTime);
    console.log("Interactions is :", interactions);
  };
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
            <Route path="/memo" exact>
              <Profiler id="MemoExample" onRender={callbackFunction}>
                <MemoExample />
              </Profiler>
            </Route>
            <Route path="/heroes" exact>
              <ErrorBoundary>
                <Hero heroName="Batman" />
              </ErrorBoundary>
              <ErrorBoundary>
                <Hero heroName="SupahMan" />
              </ErrorBoundary>
              <ErrorBoundary>
                <Hero heroName="BlackCanary" />
              </ErrorBoundary>
              <ErrorBoundary>
                <Hero heroName="Joker" />
              </ErrorBoundary>
            </Route>
            <Route path="/counters">
              Classes
              <Counter
                render={(count, incrementCount) => {
                  return (
                    <CounterClick
                      count={count}
                      incrementCount={incrementCount}
                    />
                  );
                }}
              />
              <Counter
                render={(count, incrementCount) => {
                  return (
                    <CounterHover
                      count={count}
                      incrementCount={incrementCount}
                    />
                  );
                }}
              />
              Functions
              <CounterF
                render={(count, incrementCount) => {
                  return (
                    <CounterClickF
                      count={count}
                      incrementCount={incrementCount}
                    />
                  );
                }}
              />
              <CounterF
                render={(count, incrementCount) => {
                  return (
                    <CounterHoverF
                      count={count}
                      incrementCount={incrementCount}
                    />
                  );
                }}
              />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
