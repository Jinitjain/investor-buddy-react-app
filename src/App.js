import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from './components/AppBar.js'
import {Router, Route} from "react-router";

function App() {
  return (
    <div className="App">
      <AppBar />
      
      <Router history={} path={"home"}  />
    </div>
  );
}

export default App;
