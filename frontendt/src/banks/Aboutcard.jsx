import "./css/aboutcard.css";
import { bankinfo } from "./lib/bankinfo";
import { useState,useEffect } from "react";
import Headercard from "./about/Headercard";
const banksArray = Object.values(bankinfo);
import Tablecard from "./about/Tablecard";
import Chartcard from "./about/Chartcard";
import Footcard from "./about/Footcard"


function Aboutcard({ bank,buttonaction}) {
  const [bankselected, setBankselected] = useState(null);
  const [selectedcode,setselectedcode]=useState('USD')

  useEffect(() => {
    if (!bank) return;

    const up = banksArray.find(
      (e) => e.logo === bank.bank_name|| e.website === bank.website
    );

    setBankselected(up);
  }, [bank]);



  return (
    <div className="about-card">
      <button className="butt-off" onClick={()=>{
        buttonaction(null)
      }}>      <i
                        className={`fa-solid ${
                            bankselected
                                ? "fa-angles-right"
                                : "fa-angles-left"
                        }`}
                    ></i></button>
      <Headercard bankdata={bankselected} />
      <Tablecard  bankdata={bank} SelectedCurrency={setselectedcode} />
      <Chartcard  selectedcurrency={selectedcode} ></Chartcard>
      <Footcard bankdata={bankselected}/>
    </div>
  );
}

export default Aboutcard;