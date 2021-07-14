// is necessary the React import?
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import ItemContext from './components/itemContext';
import NavBar from './components/Navbar';
import { Video } from './interfaces';
import Home from './pages/Home';
import Player from './pages/Player';


const App = () => {
  const [item, setItem] = useState<Video|null>(null);
  const [name, setName] = useState('default');

  useEffect(() => {
    if (item !== null) {
      setName(item.name);
    }
  }, [item]);

  return (
    <ItemContext.Provider value={{item, name}} >
    <Router>
      <div className="App container p-0">
        <NavBar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/player/:id">
            <Player setItem={setItem} />
          </Route>
          <Route path="*">
            <Home />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  </ItemContext.Provider>
  );
};

export default App;
