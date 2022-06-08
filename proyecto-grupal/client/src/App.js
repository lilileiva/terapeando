import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import RegisterForm from './components/RegisterForm/RegisterForm';


function App() {
  return (
    <div className="App">

      <Routes>
        <Route exact path='/signup' element={<RegisterForm />} />
      </Routes>

    </div>
  );
}

export default App;
