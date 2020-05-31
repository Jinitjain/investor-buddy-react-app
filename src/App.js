import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from './components/AppBar.js'
import ImpactTable from './components/ImpactTable.js'
import ImpactAllTable from './components/ImpactAllTable'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dropdown from './components/dropdown'
import AnimatedMultiselectList from './components/MultiselectList'
import {useSelector} from "react-redux";
import {Redirect} from 'react-router-dom'

function App() {

    const isLoggedIn = useSelector(state => state.isLoggedIn)

  return (
    <div className="App">
    <Router>
      <AppBar />

        {isLoggedIn ?
          <Switch>
              <Route
                  path='/table'
                  component={ImpactTable}
              />
              <Route
                  path="/dropdown"
                  component={Dropdown}
              />
              <Route
                  path="/multiselectlist"
                  component={AnimatedMultiselectList}
              />

              <Route
                  path="/alltable"
                  component={ImpactAllTable}
              />
          </Switch>
            : <Redirect push to="/" />}
    </Router>

    </div>
  );
}

export default App;
