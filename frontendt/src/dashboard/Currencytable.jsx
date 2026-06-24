import "./css/currencytable.css";
import codelogo from "../lib/flags"
import cbe from "../assets/logo/CBE.png";
import { logos } from "../lib/banklogo";

import { useState } from "react";


function CurrencyTable({ data, selected, selectedCurrency, selectedDate }) {
  const [visibleRows, setVisibleRows] = useState(6)
  const [showAll, setShowAll] = useState(false)

  const filteredData = data.filter((item) => {
    const bankMatch = selected
      ? item.bank_name === selected
      : true;

    const currencyMatch = selectedCurrency
      ? item.currency_code === selectedCurrency
        : true

    const dateMatch = selectedDate
      ? item.created_at.startsWith(selectedDate)
        : true;

    return bankMatch && currencyMatch && dateMatch;
  });

  return (
    <div className="table-con">
      <h1><i class="fa-solid fa-money-bill-transfer"></i> Exchange Rates</h1>

      <table>
      

        <thead>
          <tr>
            <th>Bank Name</th>
            <th>Currency</th>
            <th>Buy</th>
            <th>Sell</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.slice(0,visibleRows).map((item, index) => (
              <tr key={index}>
                <td className="bank-cell" data-label="Bank Name">
                  <img
                    src={logos[item.bank_name.toLowerCase()] || cbe}
                    alt={item.bank_name}
                    className="table-logo"
                  />
                  {item.bank_name}
                </td>

          
                <td className="code-cell" data-label="Currency">
  <img
    src={
      codelogo?.[item.currency_code?.toLowerCase()]
        ? `https://flagcdn.com/w40/${codelogo[item.currency_code.toLowerCase()]}.png`
        : "https://flagcdn.com/w40/un.png"
    }
    alt="flag"
  />    <span>{item.currency_code}</span>
</td>
                <td className="buy" data-label="Buy">{item.buy}</td>
                <td className="sell" data-label="Sell">{item.sell}</td>
                <td className="date" data-label="Date">
                 {new Date(item.created_at).toLocaleString("en-US", {
                     month: "short",
                     day: "numeric",
                     hour: "numeric",
                     minute: "2-digit", })}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="button-con" ><button  onClick={()=>{
       setShowAll(prev => {
       setVisibleRows(prev ? 6 : filteredData.length)
       return !prev})
      }}>{showAll?"SHOW LESS...":"SHOW MORE"}</button></div>
    </div>
  );
}

export default CurrencyTable;