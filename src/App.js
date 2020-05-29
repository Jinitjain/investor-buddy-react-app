import React from 'react';
import logo from './logo.svg';
import './App.css';
import Box from '@material-ui/core/Box';
import AppBar from './components/AppBar.js'
import ImpactTable from './components/ImpactTable.js'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Dropdown from './components/dropdown'

function App() {
  return (
    <div className="App">
      <AppBar />

      <div>
        <Box p={5}>
          <ImpactTable />
        </Box>        
      </div>
      
      <Router>
          <Route path="/dropdown" component={Dropdown} />
      </Router>
    </div>
  );
}

export default App;
