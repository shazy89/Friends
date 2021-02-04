import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import {ActionCableProvider} from 'react-actioncable-provider';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle'
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import rootReducer from './reducers/rootReducer'
import { loadState, saveState } from './localStorage'



const persistedState = loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, persistedState,
  composeEnhancers(applyMiddleware(thunk))
);


  store.subscribe(throttle(() => {
    saveState(store.getState())
  }, 1000));


ReactDOM.render(<ActionCableProvider  url={'ws://localhost:3001/cable'}>
  <Provider store={store}>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </Provider>, </ActionCableProvider>, document.getElementById('root'));

