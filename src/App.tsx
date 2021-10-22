import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Pool from "./pages/Pool";
import NavBar from "./components/Navbar";
import "./App.css";
import Web3ReactManager from "./components/Web3ReactManager";

function App() {
  return (
    <Router>
      <NavBar />
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Web3ReactManager>
        <Switch>
          <Route path="/pool" component={Pool} />
          {/* Redirects every other routes to the pool route */}
          <Route path="*">
            <Redirect to="/pool" />
          </Route>
        </Switch>
      </Web3ReactManager>
    </Router>
  );
}

export default App;
