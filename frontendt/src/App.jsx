import "./App.css";
import { Routes, Route, data } from "react-router-dom";

import Home from "./pages/Home";
import Api from "./pages/Api";
import Banks from "./pages/Banks";
import About from "./pages/About";
import { useState,useEffect } from "react"

import axios from "axios";
function App(){
    const [data, setdata] = useState([]);
    const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
    
    useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/rates/${selectedDate}`
        );
        setdata(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getdata();
  }, [selectedDate]);


  return (
    <Routes>

      <Route 
        path="/" 
        element={<About/>} 
      />

      <Route 
        path="/dashboard" 
        element={<Home data={data} />} 
      />
      
      <Route 
        path="/banks" 
        element={<Banks data={data}  onDateChange={setSelectedDate}/>} 
      />
      
      <Route 
        path="/api" 
        element={<Api/>} 
      />
     

    </Routes>
  )
}

export default App;
  