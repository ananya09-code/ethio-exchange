import { useState, useEffect,useMemo} from "react";
import "./css/bankcard.css"
import codelogo from "../lib/flags"
import cbe from "../assets/logo/CBE.png";
import { logos } from "../lib/banklogo";




function Bankcard({data,selectedDate,selectedCurrency,onView,seacheditems}){

const filteredData = useMemo(() => {
    return data.filter((item) => {
        const currencyMatch = selectedCurrency
            ? item.currency_code === selectedCurrency
            : true;

        const dateMatch = selectedDate
            ? item.created_at.startsWith(selectedDate)
            : true;

        return currencyMatch && dateMatch;
    });
}, [data, selectedCurrency, selectedDate]);



   const banklist = useMemo(() => {
    const banks = [...new Set(filteredData.map(item => item.bank_name))];

    return banks.map(bank => ({
        bank_name: bank,
        data: filteredData.filter(item => item.bank_name === bank)
    }));
}, [filteredData]);

  return (
  <div className="bank-con">

    {banklist
      .filter(bank =>
        bank.bank_name
          .toLowerCase()
          .includes(seacheditems?.toLowerCase() || "")
      )
      .map(bank => (
        <div className="bank-card" key={bank.bank_name}>

          <div className="head-con">
            <h3>{bank.bank_name.at(0).toUpperCase()+ bank.bank_name.slice(1,bank.bank_name.length)}</h3>

            <img
              src={logos[bank.bank_name.toLowerCase()] || cbe}
              alt={bank.bank_name}
              className="bank-logo"
            />
          </div>

          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Buy</th>
                <th>Sell</th>
              </tr>
            </thead>

            <tbody>
              {bank.data.slice(0, 3).map(item => (
                <tr key={item.id}>
                  <td className="flag-con">
                    <img
                      src={
                        codelogo?.[item.currency_code?.toLowerCase()]
                          ? `https://flagcdn.com/w40/${codelogo[item.currency_code.toLowerCase()]}.png`
                          : "https://flagcdn.com/w40/un.png"
                      }
                      alt="flag"
                    />
                    {item.currency_code}
                  </td>

                  <td className="buy">{item.buy}</td>
                  <td className="sell">{item.sell}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="butt-co">
            <button onClick={() => onView(bank)}>View More..</button>
            <button className="compere">compare Banks</button>
            <button className="viwe">Vist Site</button>
          </div>

        </div>
      ))}
  </div>
);}
export default Bankcard