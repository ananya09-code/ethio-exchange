import CurrencyTable from "../dashboard/Currencytable";
import Calculator from "../dashboard/Calculator";
import Popluar from "../dashboard/Popluar"
import CurrencyChart from "../dashboard/Currencychart";
import Currencybar from "../dashboard/Currencybar";

import "./css/dashboard.css";
import { useState } from "react";
function Dashboard({ data, selectedBank, selectedDate }) {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  return (
    <div className="dashboard">
      <Currencybar
        sentdata={data}
        setSelectedCurrency={setSelectedCurrency}
      />

   

      <Popluar selectedCurrency={selectedCurrency} />

        <CurrencyChart selectedcurrency={selectedCurrency}/>

   

      <div className="con-p">
        <CurrencyTable
          data={data}
          selected={selectedBank}
          selectedCurrency={selectedCurrency}
          selectedDate={selectedDate}
        />

        <Calculator data={data} />
      </div>
    </div>
  );
}


export default Dashboard