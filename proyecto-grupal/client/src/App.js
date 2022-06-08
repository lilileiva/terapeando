import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" component={NavBar} />
      </Routes>
    </div>
  );
}

export default App;
