import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Api from "../pages/Api";

function App(){

  return (
    <Routes>

      <Route 
        path="/" 
        element={<Home />} 
      />
      
      <Route 
        path="/api" 
        element={<Api />} 
      />

    </Routes>
  )
}

export default App;
  