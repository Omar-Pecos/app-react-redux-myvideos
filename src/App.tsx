// is necessary the React import?
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Player from './pages/Player';

const App = () => {
  return (
    <Router>
      <div className="App container p-0">
        <NavBar />

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

        <Footer />
      </div>
    </Router>
  );
};

export default App;
