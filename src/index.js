import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from "redux";

const signIn = () => {
    return {
        type: 'signIn'
    }
}

const assignOut = () => {
    return {
        type: 'signOut'
    }
}

const initialState = {
    username: ''
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'signIn':
            return state.username = "Pratik"
        case 'signOut':
            return state.username = ''
    }
}

let store = createStore(auth)

store.dispatch(signIn())

store.subscribe(() => console.log(store.getState()))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
