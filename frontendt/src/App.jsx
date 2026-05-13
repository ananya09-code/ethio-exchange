import "./App.css";

import axios from "axios";
import { useState, useEffect } from "react";

import Header from "./Layout/Header";
import Sidebar from "./Layout/Sidebar";
import Dashboard from "./Layout/Dashboard";


function App() {
  const [data, setdata] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedCurrency, setselectedCurrency] = useState(null);

  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000");
        setdata(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getdata();
  }, []);

  return (
    <div className="app">
      <Header />

      <div className="body">
    
        <Sidebar
          data={data}
          onSelectBank={setSelectedBank}
          onSelectCurrency={setselectedCurrency}
        />
      
        <div className="main">
          <Dashboard
            data={data}
            selectedBank={selectedBank}
            Currency={selectedCurrency}
          />
        </div>
      </div>
    </div>
  );
}

export default App;