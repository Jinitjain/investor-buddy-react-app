import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginDialogBox from './components/LoginDialogBox.js'
import RegisterDialogBox from './components/RegisterDialogBox.js'

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
      <LoginDialogBox />
      <RegisterDialogBox />
    </div>
  );
}

export default App;
