
import axios from "axios";
import { useState, useEffect } from "react";

import Header from "../src/Layout/Header";
import Mainbar from "../src/Layout/Mainbar";
import Dashboard from "../src/Layout/Dashboard";
import Footer from "../src/Layout/Footer";

function Home(){
  const [data, setdata] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedCurrency, setselectedCurrency] = useState(null);
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
    };

    getdata();
  }, [selectedDate]);
    return(
    <div className="app">
      <Header />

      <div className="body">
         <Mainbar />
         
        <div className="main">
          <Dashboard
            data={data}
            selectedBank={selectedBank}
            Currency={selectedCurrency}
            selectedDate={selectedDate}
          />
        </div>
      </div>
          <Footer/>
      
    </div>
    );
}

export default Home


