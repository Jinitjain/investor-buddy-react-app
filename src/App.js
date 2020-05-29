import React from 'react';
import logo from './logo.svg';
import './App.css';
import Box from '@material-ui/core/Box';
import AppBar from './components/AppBar.js'
import ImpactTable from './components/ImpactTable.js'
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <AppBar />

      <div>
        <Box p={5}>
          <ImpactTable />
        </Box>        
      </div>
    </div>
  );
}

export default App;
