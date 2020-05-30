import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from './components/AppBar.js'
import ImpactTable from './components/ImpactTable.js'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Dropdown from './components/dropdown'
import AnimatedMultiselectList from './components/MultiselectList'

function App() {
  return (
    <div className="App">
      <AppBar />

      <Router>
          <Route
              path='/table'
              component={ImpactTable}
          />
      </Router>
      
      <Router>
          <Route
              path="/dropdown"
              component={Dropdown}
          />
      </Router>

      <Router>
          <Route
              path="/multiselectlist"
              component={AnimatedMultiselectList}
          />
      </Router>
    </div>
  );
}

export default App;
