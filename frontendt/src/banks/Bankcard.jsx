import { useState, useEffect,useMemo} from "react";
import "./css/bankcard.css"
import codelogo from "../dashboard/assets/flags";
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
import Chartcard from "./about/Chartcard";

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




function Bankcard({data,selectedDate,selectedCurrency,onView}){

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

    return(
        <div className="bank-con">

            {banklist.map(bank=>(

                <div className="bank-card" key={bank.bank_name}>
                    <div className="head-con">

                    <h3>{bank.bank_name}</h3>
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

                        {bank.data.slice(0,3).map(item=>(

                            <tr key={item.id}>

                                <td className="flag-con">
                                     <img src={
      codelogo?.[item.currency_code?.toLowerCase()]
        ? `https://flagcdn.com/w40/${codelogo[item.currency_code.toLowerCase()]}.png`
        : "https://flagcdn.com/w40/un.png"
    }
    alt="flag"
  />  {item.currency_code}
                                </td>

                                <td className="buy">
                                    {item.buy}
                                </td>

                                <td className="sell">
                                    {item.sell}
                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>



                 <div className="butt-co">

                    <button className="viwe" onClick={()=>onView(bank)}>View More..</button>
                    <button className="compere">compare Banks</button>
                    <button className="link-bank">Vist Site</button>
                 </div>


                </div>

            ))}

        </div>
    )
}

export default Bankcard;