import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore(); //creates redux store calling configureStore into the variable

export default function App() {
  return (
    //provider component passing the store to the provider component; gives ability for components to connect to redux store
    <Provider store={store}>
      <Main />
    </Provider>
  ); //returns main component
}
