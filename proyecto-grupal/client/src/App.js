import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CardPsychologist from './components/CardPsychologist/CardPsychologist';
import './App.css';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/cardPsicologist" element={<CardPsychologist/>} />
        </Routes>
    </div>
  );
}

export default App;
