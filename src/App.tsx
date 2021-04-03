// is necessary the React import?
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Player from './pages/Player';

const App = () => {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/player/vfxhcjyet85">Player</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/player/:id">
            <Player />
          </Route>
          <Route path="*">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
