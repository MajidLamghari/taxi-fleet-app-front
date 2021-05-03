import React from 'react';
import logo from './logo-taxi.png';
import './App.css';
import TaxiBox from './components/TaxiBox'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <h3>Taxi ride application</h3>
        <TaxiBox />
      </header>
    </div>
  );
}

export default App;
