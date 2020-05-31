import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from './components/AppBar.js'
import ImpactTable from './components/ImpactTable.js'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dropdown from './components/dropdown'
import AnimatedMultiselectList from './components/MultiselectList'

function App() {
  return (
    <div className="App">
    <Router>
      <AppBar />

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
          </Switch>
    </Router>

    </div>
  );
}

export default App;
