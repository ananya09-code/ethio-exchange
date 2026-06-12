
import { useState, useEffect } from "react";

import Header from "../Layout/Header";
import Mainbar from "../Layout/Mainbar";
import Footer from "../Layout/Footer";
import Dashboard from "../Layout/Dashboard";

function Home({data}){
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedCurrency, setselectedCurrency] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );


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


