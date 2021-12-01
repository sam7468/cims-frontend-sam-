import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../App';
import reportWebVitals from '../reportWebVitals';
import { createStore } from "redux";
import { Provider } from 'react-redux';
import allReducers from '../reducers/AllReducers';
import { BrowserRouter } from 'react-router-dom';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { PersistGate } from 'redux-persist/integration/react'


const persistConfig = {
  key: 'root',
  storage,
  stateReconciler:autoMergeLevel2,
  whitelist: ['editmode']
}

const persistedReducer = persistReducer(persistConfig, allReducers)

const store = createStore(persistedReducer);

let persistor = persistStore(store)

ReactDOM.render(
    
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          
            <App />

        </PersistGate>    
      </Provider>
    ,

  document.getElementById('root')
);
