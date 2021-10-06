import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Pool from "./pages/Pool";
import NavBar from "./components/Navbar";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/pool" component={Pool} />
        //Redirects every other routes to the pool route
        <Route path="*">
          <Redirect to="/pool" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
