import "./css/currencytable.css";
import codelogo from "./assets/flags";
import cbe from "../assets/logo/CBE.png";
import awash from "../assets/logo/awsah.webp";
import dashen from "../assets/logo/Dashen.png";
import nib from "../assets/logo/nib.webp";
import abyssinia from "../assets/logo/abyssinia.webp";
import abay from "../assets/logo/abay.webp";
import hibret from "../assets/logo/hibret.svg";
import berhan from "../assets/logo/Berhan.png";
import addis from "../assets/logo/Addis.png";
import wegagen from "../assets/logo/Wegagen.png";
import zemen from "../assets/logo/Zemen.png";
import bunna from "../assets/logo/Bunna.png";
import amhara from "../assets/logo/Amhara.png";
import oromia from "../assets/logo/Oromia.png";
import ahadu from "../assets/logo/Ahadu.svg";
import gadaa from "../assets/logo/Gadaa.png";
import enat from "../assets/logo/Enat.png";
import global from "../assets/logo/Global.svg";
import rammis from "../assets/logo/Rammis.png";
import hijra from "../assets/logo/Hijra.png";
import siinqee from "../assets/logo/Siinqee.png";
import development from "../assets/logo/Development.png";
import cooperative from "../assets/logo/Cooperative.png";

import { useState } from "react";
const logos = {
  cbe,
  awash,
  dashen,
  nib,
  abyssinia,
  abay,
  hibret,
  berhan,
  addis,
  wegagen,
  zemen,
  bunna,
  amhara,
  oromia,
  ahadu,
  gadaa,
  enat,
  global,
  rammis,
  hijra,
  siinqee,
  development,
  cooperative,

};


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