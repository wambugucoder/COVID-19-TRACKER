import './App.css';

import { Route, BrowserRouter as Router }  from 'react-router-dom';

import Covid from './Components/Covid';
import { Provider } from "react-redux";
import React from 'react';
import store from './others/store';
import DarkTheme, { createTheme } from 'react-dark-theme'
 
const lightTheme = {
  background: 'white',
  text: 'black',
}
 
const darkTheme = {
  background: 'black',
  text: 'white',
}
 
const myTheme = createTheme(darkTheme, lightTheme)
function App() {
  return (
    <Provider store={store}>
     <Router>
     <div className="App">
     
        <DarkTheme light={lightTheme} dark={darkTheme} />
     
      <Route exact path='/' component={Covid}/>
    
      </div>
     </Router>
    </Provider>
    
  );
}

export default App;
